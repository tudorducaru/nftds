const axios = require('axios');

/*
    Makes a request to Twitter's API to get follower counts for projects
    Insert a new twitter_follower_count property in each project object
    in the array passed as a parameter
    @param projects - array of project objects
*/
const getTwitterFollowers = async projects => {

    // Get the Twitter usernames of the project
    const twitter_usernames = projects.map(project => {

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

            project.twitter_followers_count = entry.public_metrics.followers_count;

        });
        
    } catch (e) {
        console.log('Error retrieving Twitter follower counts');
        console.log(e.response.data);
    }

};

module.exports = getTwitterFollowers;

