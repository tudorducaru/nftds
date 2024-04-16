const cron = require('node-cron');
const dateFNS = require('date-fns');
const nodemailer = require('nodemailer');

/*
    Get the transporter for sending emails
    @return email transporter
*/
const getEmailTransporter = () => {

    return nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NFTDS_EMAIL,
            pass: process.env.NFTDS_PASSWORD
        }
    });

};

/*
    Schedule a cron job every day at 00:00 UTC
    that sends mint reminder emails to users
    @param dbConnection - connection to the MySQL database
*/
const setMintReminders = dbConnection => {

    console.log('Scheduling mint reminders');

    // Send email at a specific time
    cron.schedule('0 0 * * *', () => {

        console.log('Sending mint reminders...');

        // Get today's date
        const today = new Date();
        const dateString = dateFNS.format(today, 'yyyy-MM-dd');

        // Get today's mints
        dbConnection.query(`
            SELECT mint_reminders.email, projects.name, projects.website_link
            FROM mint_reminders JOIN projects ON mint_reminders.project_id = projects.id
            WHERE projects.mint_date = ?
        `, [dateString], (err, results) => {

            // Check for errors
            if (err) console.log('Error sending mint reminder emails', err);

            // Get the email transporter 
            const transporter = getEmailTransporter();

            // Send an email for each reminder set by a user
            let mailOptions;
            results.forEach(result => {

                // Construct mail options
                mailOptions = {
                    from: `NFTDS Reminders <${process.env.NFTDS_EMAIL}>`,
                    to: result.email,
                    subject: `Mint Day Reminder for ${result.name}`,
                    text: `${result.name} is minting today! \n Check their website ${result.website_link} and be sure not to miss it!`
                }

                // Send the email
                transporter.sendMail(mailOptions)
                    .then(() => console.log(`Mint reminder sent to ${result.email} for project ${result.name}`))
                    .catch(err => console.log(`Error sending mint reminder to ${result.email} for project ${result.name}`, err));

            });

        });

    });

};

// Export setup function
module.exports = setMintReminders;