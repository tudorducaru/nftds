const cron = require('node-cron');
const dateFNS = require('date-fns');

/*
    Schedule a cron job every day at 12:00 UTC 
    that deletes all projects that minted before that day

    No timezone is more than 12h behind UTC, so by 00:00 UTC-12
    all projects in the previous day should have been minted

    Example: project mints at 23:59 UTC-12 on 30.3. 00:00 UTC-12 31.3 is equivalent
    to 12:00 UTC 31.3, so the project minted on 30 will be deleted

    @param dbConnection - connection to the MySQL database
*/
const deleteMintedProjects = dbConnection => {

    cron.schedule('0 13 * * *', () => {

        console.log('Deleting minted projects...');

        // Get today's date
        const today = new Date();
        const dateString = dateFNS.format(today, 'yyyy-MM-dd');

        // Delete projects minted before today
        dbConnection.query(
            'DELETE FROM projects WHERE mint_date < ?',
            [dateString],
            (err, results) => {

                // Check for errors
                if (err) console.log('Error deleting minted projects', err); 
                return;

            });

    });

};

// Export setup function
module.exports = deleteMintedProjects;