const mysql = require('mysql');

// Create new database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to MySQL');
        console.log(err);
    } else {
        console.log('Connected successfully to MySQL');
    }
})

// Export the connection
module.exports = connection;