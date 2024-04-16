import { Router } from 'express';
const authRouter = Router();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { dbConnection } from '../db.js';

/*
    Middleware that checks the validity of the 
    CSRF token in the request according to the double-submit
    cookie mechanism

    1. Check if the CSRF token is present both in a cookie
       and in the header (cookie name = CSRF-TOKEN; header name = csrf-token)
    2. Check if the CSRF token matches the hash of the session id
*/
const csrf = (req, res, next) => {

    // extract info from request and headers
    const csrfCookie = req.cookies['CSRF-TOKEN'];
    const csrfHeader = req.headers['csrf-token'];
    const jwt = req.cookies['jwt'];

    // check if csrf tokens are present
    if (!csrfCookie || !csrfHeader || !jwt) {
        return res.status(401).send('Tokens not present');
    }

    // check if csrf cookie matches csrf header
    if (csrfCookie !== csrfHeader) {
        return res.status(401).send('CSRF tokens do not match');
    }

    // validate csrf token
    const sessionId = jwtDecode(jwt).sessionId;
    const hash = crypto.createHmac('sha256', process.env.CSRF_TOKEN_SECRET).update(sessionId).digest('hex');

    if (csrfCookie !== hash) {
        return res.status(401).send('Invalid CSRF token');
    }

    next();

};

/*
    Middleware that authenticates requests based on JWT
    Extracts the token from the Authentication header
    and verifies its validity
    Puts userId in req.userId if successful
*/
const authenticateReq = (req, res, next) => {

    // retrieve jwt from cookie
    const token = req.cookies.jwt;

    if (!token) return res.status(401).send('JWT token not provided');

    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).send('JWT token invalid');

        // put the id inside the req variable
        req.userId = user.userId;

        next();

    });
};

/*
    Generate a JWT based on the user ID
    Payloard should have 2 fields:
    - userId: id of the authenticated user
    - sessionId: uuid value unique for each token
*/
const generateJWT = userId => {

    // construct payload
    const payload = {
        userId,
        sessionId: uuidv4()
    }

    // create the jwt
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    return token;
};

// Generate CSRF token as hash of the session Id within the JWT
const generateCsrf = jwt => {

    // decode the JWT
    const decodedJwt = jwtDecode(jwt);

    // get the data needed for token creation
    const sessionId = decodedJwt.sessionId;
    const secretKey = process.env.CSRF_TOKEN_SECRET;

    // hash the sessionId using the secret key
    const csrfToken = crypto.createHmac('sha256', secretKey).update(sessionId).digest('hex');

    return csrfToken;

}

/*
    User verification route
    Meant to be used by the client to determine whether 
    the user is logged in or not.

    Simply check if the JWT and CSRF tokens are present and valid
*/
authRouter.get('/verifyUser', csrf, authenticateReq, (req, res, next) => res.send());

// Login route
authRouter.post('/login', async (req, res, next) => {

    // Check the info provided in the request
    if (!req.body || !req.body.username || !req.body.password) return res.status(400).send('Please provide username and password');

    // Get user information from the database
    dbConnection.query(
        'SELECT * FROM admins WHERE username = ?',
        [req.body.username],
        (err, results) => {

            // Check if there were any errors
            if (err) return res.status(500).send(err.sqlMessage);

            // Check if user exists
            if (results.length === 0) return res.status(404).send('User not found');

            // Verify the user's credentials
            bcrypt.compare(req.body.password, results[0].password, (err, result) => {

                // Check if there were any errors
                if (err) return res.status(500).send('Internal server error');

                if (!result) return res.status(400).send('Incorrect password');

                // Generate JWT and CSRF token
                const jwt = generateJWT(result._id);
                const csrf = generateCsrf(jwt);

                // Set tokens in cookies
                res.cookie('jwt', jwt, { httpOnly: true, secure: true, maxAge: 1000 * 3600 * 24 * 365 });
                res.cookie('CSRF-TOKEN', csrf, { secure: true, maxAge: 1000 * 3600 * 24 * 365 })

                return res.send();

            })

        }
    )

});

// Logout route
authRouter.post('/logout', csrf, authenticateReq, async (req, res, next) => {

    // Clear cookies
    res.clearCookie('jwt');
    res.clearCookie('CSRF-TOKEN');
    return res.send();

});

export default authRouter;

export {
    authenticateReq,
    csrf
};