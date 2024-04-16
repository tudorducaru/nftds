const express = require('express');
const emailRouter = express.Router();

const nodemailer = require('nodemailer');

// Create transporter for sending emails
var transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ANDYTHEARTIST_EMAIL,
        pass: process.env.ANDYTHEARTIST_PASSWORD
    }
});

// Send email
emailRouter.get('/sendEmail', (req, res, next) => {

    // Verify that all parameters have been provided
    if (!req.query.email || !req.query.collectionName || !req.query.pack || !req.query.txHash) {
        return res.status(400).send('Not all parameters provided in the request body');
    }

    // Construct mail
    let mailOptions = {
        from: process.env.ANDYTHEARTIST_EMAIL,
        to: 'manea.andy@gmail.com',
        subject: 'New NFT Design Client!',
        text: `Client email: ${req.query.email} \nCollection name: ${req.query.collectionName} \n\nPack Purchased: ${req.query.pack} \n\nTransaction hash: ${req.query.txHash}`
    };

    // Send mail
    transporter.sendMail(mailOptions)
        .then(() => {
            return res.send('Confirmation email sent')
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err.message);
        });

});

// Export transporter
module.exports = emailRouter;