import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { dbConnection, getDbConnection } from './db.js';

// Import routers
import authRouter, { authenticateReq, csrf } from './routers/authRouter.js';

// Import APIs
import updateDiscordCounts from './apis/discord_api.js';
import updateTwitterFollowers from './apis/twitter_api.js';

// Import cron jobs
import setMintReminders from './cronJobs/mintReminders.js';
import deleteMintedProjects from './cronJobs/deleteMintedProjects.js';
import updateProjectStats from './cronJobs/updateProjectStats.js';

// Entrypoint
const app = express();

// Connect to MySQL database
getDbConnection();

// Serve the static assets from the build folder
app.use(express.static(path.resolve('../client/build')));

// Set cron jobs
setMintReminders();
deleteMintedProjects();
updateProjectStats();

// Parse incoming cookies
app.use(cookieParser());

// Parse body of requests
app.use(express.json());

// Set up the routers
app.use('/admin', authRouter);

// Get projects route
app.get('/projects', (req, res, next) => {

    // Query the database
    dbConnection.query(
        'SELECT * FROM projects LEFT JOIN project_stats ON projects.id = project_stats.project_id',
        async (err, projects) => {

            // Check if there were any errors
            if (err) return res.status(500).send('Internal server error');

            return res.send(projects);

        });

});

// Use middleware to authenticate request for any admin operation
app.use('/admin/projects', authenticateReq);

// Insert new project route
app.post('/admin/projects', (req, res, next) => {

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
app.get('/admin/projects/:projectID', (req, res, next) => {

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
app.delete('/admin/projects/:projectID', (req, res, next) => {

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
app.put('/admin/projects/stats', async (req, res, next) => {

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
app.put('/admin/projects/:projectID', (req, res, next) => {

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

// Submit project request route
app.post('/submit-project', (req, res, next) => {

    // Check that all fields are in the request body
    if (
        !req.body ||
        !req.body.name ||
        !req.body.invite_url ||
        !req.body.website_link ||
        !req.body.twitter_link ||
        !req.body.owner_email
    ) {
        return res.status(400).send('Please provide all required information');
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
    const mint_date = req.body.mint_date ? req.body.mint_date : undefined;
    const mint_amount = req.body.mint_amount ? req.body.mint_amount : undefined;
    const mint_currency = req.body.mint_currency ? req.body.mint_currency : undefined;
    const website_link = req.body.website_link;
    const twitter_link = req.body.twitter_link;
    const owner_email = req.body.owner_email;

    // Get current time
    const created_at = Date.now();

    // Insert the project into the database
    dbConnection.query(
        'INSERT INTO project_requests VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, name, invite_url, mint_date, mint_amount, mint_currency, website_link, twitter_link, created_at, owner_email],
        (err, results) => {

            // Check if there were any errors
            if (err) return res.status(500).send('Internal server error');

            // Send back the project object
            return res.status(201).send({
                id,
                name,
                invite_url,
                mint_date,
                mint_amount,
                website_link,
                twitter_link,
                created_at,
                owner_email
            });

        }
    );

});

// Set mint reminder route
app.post('/set-mint-reminder', (req, res, next) => {

    // Check that both email and project ID have been provided
    if (!req.body || !req.body.email || !req.body.projectID) {
        return res.status(400).send('Please provide all required information in request body');
    }

    const email = req.body.email;
    const projectID = req.body.projectID;

    // Store the reminder in the database
    dbConnection.query(
        'INSERT INTO mint_reminders VALUES (?, ?)',
        [email, projectID],
        (err, results) => {

            if (err) {
                console.log(err);

                // Send different error messages depending on the error
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).send('Project with given ID does not exist in the database');
                } else if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('A reminder for this project has already been set');
                } else {
                    return res.status(500).send('Internal server error');
                }

            };

            return res.status(201).send('Reminder set successfully');

        }
    );;

});

// Handle all other get requests
app.get('*', (req, res, next) => {

    // Serve the react app
    return res.sendFile(path.resolve('../client/dist/index.html'));

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});