import express from 'express';
const adminRouter = express.Router();

// Import utils
import { v4 as uuid } from 'uuid';
import { dbConnection } from '../db.js';

// Import APIs
import updateDiscordCounts from '../apis/discord_api.js';
import updateTwitterFollowers from '../apis/twitter_api.js';

// Insert new project route
adminRouter.post('/', (req, res, next) => {

    // Check that all fields are in the request body
    if (
        !req.body ||
        !req.body.name ||
        !req.body.invite_url ||
        req.body.fakemeter === 'undefined' ||
        !req.body.website_link ||
        !req.body.twitter_link
    ) {
        return res.status(400).send('Incomplete information in request body');
    }

    // Get project information
    let id = uuid();

    // Need to switch 1st and 3rd field to be able to order by creation time
    const id_components = id.split('-');
    id = `${id_components[2]}-${id_components[1]}-${id_components[0]}`;
    for (let i = 3; i < id_components.length; i++) {
        id += '-' + id_components[i];
    }

    const name = req.body.name;
    const invite_url = req.body.invite_url;
    const fakemeter = req.body.fakemeter;
    const mint_date = req.body.mint_date ? req.body.mint_date : undefined;
    const mint_amount = req.body.mint_amount ? req.body.mint_amount : undefined;
    const mint_currency = req.body.mint_currency ? req.body.mint_currency : undefined;
    const website_link = req.body.website_link;
    const twitter_link = req.body.twitter_link;

    // Get current time
    const created_at = Date.now();

    // Insert the project into the database
    dbConnection.query(
        'INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, name, invite_url, fakemeter, mint_date, mint_amount, mint_currency, website_link, twitter_link, created_at],
        async (err, results) => {

            // Check if there were any errors
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }

            // Get stats for this project
            const project = {
                id,
                invite_url,
                twitter_link
            }
            await updateDiscordCounts([project]);
            await updateTwitterFollowers([project]);

            // Send back the project object
            return res.status(201).send({
                id,
                name,
                invite_url,
                fakemeter,
                mint_date,
                mint_amount,
                website_link,
                twitter_link
            });

        }
    );

});

// Get individual project route
adminRouter.get('/:projectID', (req, res, next) => {

    // Query the database
    dbConnection.query(
        'SELECT * FROM projects WHERE id = ?',
        [req.params.projectID],
        (err, results) => {

            // Check if there were any errors
            if (err) return res.status(500).send('Internal server error');

            // Send back the project
            return res.send(results[0]);

        }
    );

});

// Delete project route
adminRouter.delete('/:projectID', (req, res, next) => {

    // Delete the project from the database
    dbConnection.query(
        'DELETE FROM projects WHERE id = ?',
        [req.params.projectID],
        (err, results) => {

            // Check if there were any errors
            if (err) return res.status(500).send('Internal server error');

            // Send back the number of rows affected
            return res.send(results.affectedRows.toString());

        }
    );

});

// Update project stats (discord counts, twitter followers, logo url)
adminRouter.put('/stats', async (req, res, next) => {

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

            } catch (err) {

                console.log(err);
                return res.status(500).send('Error updating project stats');

            }


            return res.send();
        })
});

// Update project route
adminRouter.put('/:projectID', (req, res, next) => {

    // Check that all fields are in the request body
    if (
        !req.body ||
        !req.body.name ||
        !req.body.invite_url ||
        req.body.fakemeter === 'undefined' ||
        !req.body.website_link ||
        !req.body.twitter_link
    ) {
        return res.status(400).send('Incomplete information in request body');
    }

    // Get project information
    const id = req.params.projectID;
    const name = req.body.name;
    const invite_url = req.body.invite_url;
    const fakemeter = req.body.fakemeter;
    const mint_date = req.body.mint_date ? req.body.mint_date : undefined;
    const mint_amount = req.body.mint_amount ? req.body.mint_amount : undefined;
    const mint_currency = req.body.mint_currency ? req.body.mint_currency : undefined;
    const website_link = req.body.website_link;
    const twitter_link = req.body.twitter_link;

    // Update the row in the database
    dbConnection.query(
        'UPDATE projects SET name = ?, invite_url = ?, fakemeter = ?, mint_date = ?, mint_amount = ?, mint_currency = ?, website_link = ?, twitter_link = ? WHERE id = ?',
        [name, invite_url, fakemeter, mint_date, mint_amount, mint_currency, website_link, twitter_link, id],
        (err, results) => {

            // Check if there were any errors
            if (err) return res.status(500).send('Internal server error');

            // Send back the number of rows affected
            return res.send(results.affectedRows.toString());

        }
    )

});

export default adminRouter;