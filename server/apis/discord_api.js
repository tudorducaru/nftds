const { dbConnection } = require('../db');
const { Client, Intents } = require('discord.js');

/*
    Retrieve Discord member counts and online member counts for
    every project in the given array. 
    Update the discord_members and discord_online_members attributes in the
    project_stats table with the relevant values for each project
    @param projects - array of project objects for which to retrieve stats
*/
const updateDiscordCounts = async projects => {

    // Initialize the Discord client
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    await client.login(process.env.DISCORD_BOT_TOKEN);

    /*
        Discord allows only 50 requests per second, so split the 
        projects array into chunks of 50 and wait 1s after each request batch
    */
    for (let i = 0; i <= projects.length; i += 50) {
        chunk = projects.slice(i, i + 50);

        await Promise.all(chunk.map(async project => {

            try {

                // Fetch the server invite from the Discord API
                const invite = await client.fetchInvite(project.invite_url);

                const members = invite.memberCount;
                const online_members = invite.presenceCount;

                // Construct the logo url
                const logo_url = `https://cdn.discordapp.com/icons/${invite.channel.guildId}/${invite.channel.guild.icon}.png?size=160`

                // Update Discord counts for this project
                dbConnection.query(
                    `INSERT INTO project_stats (project_id, discord_members, discord_online_members, logo_url) VALUES (?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE discord_members = ?, discord_online_members = ?, logo_url = ?`,
                    [project.id, members, online_members, logo_url, members, online_members, logo_url],
                    (err) => {

                        if (err) {
                            console.log(`Error updating Discord counts for invite code ${invite.code}`);
                            console.log(err.sqlMessage);
                            return;
                        }

                    }
                )

            } catch (err) {

                console.log(`Error retrieving Discord counts for invite link ${project.invite_url}`);
                console.log(err.message);

            }

        }));

        await new Promise(r => setTimeout(r, 2000));
    }
}

module.exports = updateDiscordCounts;