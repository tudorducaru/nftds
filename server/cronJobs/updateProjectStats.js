import cron from 'node-cron';
import { dbConnection } from '../db.js';
import updateTwitterFollowers from '../apis/twitter_api.js';
import updateDiscordCounts from '../apis/discord_api.js';

/*
    Schedule a cron job every hour at half past
    that updates the stats of the projects 
*/
const updateProjectStats = () => {

    cron.schedule('30 * * * *', () => {

        console.log('Updating project stats...');

        // Get the projects from the database
        dbConnection.query('SELECT id, twitter_link, invite_url FROM projects',
            async (err, projects) => {

                // Check for errors
                if (err) {
                    console.log('Error retrieving projects from the database');
                    console.log(err.sqlMessage);
                    return;
                }

                // Try to update stats
                try {

                    await updateTwitterFollowers(projects);
                    await updateDiscordCounts(projects);

                    console.log('Successfully updated project stats');

                } catch (err) {

                    console.log('Error updating project stats');
                    console.log(err);

                }
            });
    });
}

// Export setup function
export default updateProjectStats;