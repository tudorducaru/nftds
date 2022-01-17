const express = require('express');
const app = express();

// Configure environment variables
require('dotenv').config();

// Connect to MySQL database
const dbConnection = require('./db.js');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});