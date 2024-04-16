import mysql from 'mysql2';

// Create new database connection
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const getDbConnection = () => {
    
    // Connect to the database
    dbConnection.connect(function (err) {
        if (err) {
            console.log('Error connecting to MySQL');
            console.log(err);
        } else {
            console.log('Connected successfully to MySQL');
        }
    });

}

export { dbConnection, getDbConnection };