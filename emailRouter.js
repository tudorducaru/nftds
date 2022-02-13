const express = require('express');
const emailRouter = express.Router();

const nodemailer = require('nodemailer');

// Create transporter for sending emails
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'clients.andytheartist@gmail.com',
        pass: '123Caprioara456'
    }
});

// Send email
emailRouter.get('/sendEmail', (req, res, next) => {
    
    // Verify that all parameters have been provided
    if (!req.body || !req.body.email || !req.body.collectionName || !req.body.pack || !req.body.price) {
        return res.status(400).send('Not all parameters provided in the request body');
    }

    // Construct mail
    let mailOptions = {
        from: 'clients.andytheartist@gmail.com',
        to: 'tducaru@gmail.com',
        subject: 'New NFT Design Client!',
        text: `Client email: ${req.body.email} \n
               Collection name: ${req.body.collectionName} \n\n
               Pack Purchased: ${req.body.pack} \n
               Price paid: ${req.body.price} ETH`
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