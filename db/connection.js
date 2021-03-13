const mysql = require("mysql");
// const { rootCertificates } = require("node:tls");   //////why do we need this?
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: root,
    password: 'password',
    database: 'employeeDB'
});

connection.connect((err)=> {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});

connection.query = util.promisify(connection.query);

module.exports = connection;