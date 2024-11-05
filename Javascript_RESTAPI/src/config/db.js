const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',   
    password: process.env.DB_PASSWORD || '1234', 
    database: process.env.DB_NAME || 'testnode' 
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
