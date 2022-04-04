const axios = require('axios');
const { dbConnection } = require('../db');

/*
    Makes a request to Twitter's API to get follower counts for projects
    Update the twitter_followers attribute in the project_stats table with
    the relevant value for each project
    @param projects - array of project objects
*/
const updateTwitterFollowers = async projects => {

    // Twitter allows only 100 usernames per request, so split the array into chunks
    for (let i = 0; i < projects.length; i += 100) {

        const chunk = projects.slice(i, i + 100);

        // Get the Twitter usernames of the project
        const twitter_usernames = chunk.map(project => {

            // Get the project's Twitter username from the Twitter link
            const url_parts = project.twitter_link.split('/');
            return url_parts[url_parts.length - 1];

        });

        // Construct the Twitter API url
        const usernames_param = twitter_usernames.join(',');
        const twitter_url = `https://api.twitter.com/2/users/by?usernames=${usernames_param}&user.fields=public_metrics`;

        // Make a request to the Twitter API
        try {

            const api_response = await axios.get(
                twitter_url,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
                    }
                }
            );

            // Add the follower counts to the array of projects
            api_response.data.data.forEach(entry => {

                // Find the project in the array by their Twitter link
                const project = projects.filter(p => p.twitter_link.toLowerCase() === `https://twitter.com/${entry.username}`.toLowerCase())[0];
                const followers = entry.public_metrics.followers_count;

                // Update twitter_followers for this project
                dbConnection.query(
                    `INSERT INTO project_stats (project_id, twitter_followers) VALUES (?, ?)
                     ON DUPLICATE KEY UPDATE twitter_followers = ?`,
                    [project.id, followers, followers],
                    (err) => {

                        if (err) {
                            console.log(`Error updating Twitter followers for ${project.id}`)
                            console.log(err.sqlMessage);
                            return;
                        }

                    }
                )

            });

        } catch (e) {
            console.log('Error retrieving Twitter follower counts');
            console.log(e.response.data);
        }


    }
};

module.exports = updateTwitterFollowers;

