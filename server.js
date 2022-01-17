const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();

// Configure environment variables
require('dotenv').config();

// Connect to MySQL database
const dbConnection = require('./db.js');

// Parse incoming cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Parse body of requests
app.use(express.json());

// Admin login route
app.post('/admin/login', (req, res, next) => {
    
    // Check that the request has all the fields required
    if (!req.body || !req.body.username || !req.body.password) return res.status(400).send('Username or password not provided');

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

                // Generate jwt
                const token = jwt.sign({ id: results[0].id }, process.env.ACCESS_TOKEN_SECRET);

                // Put the jwt in an httpOnly cookie
                res.cookie('jwt', token, { httpOnly: true, secure: true });
                res.cookie('ath', 'c3d1cf2574ea4bcd68448ebaa5f75454', { secure: true });
                return res.send();

            })

        }
    )
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});