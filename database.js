const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: '',
    database: 'samprama',
})