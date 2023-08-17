const mysql = require('mysql');

const connectMySQL = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "ajaydb"
});

connectMySQL.connect(function (err) {
    if (err) {
        console.log("error occurred while connecting");
    }
    else {
        console.log("connection Nodejs with Mysql Successfully");
    }
});

module.exports = connectMySQL;



















// con.query("DROP DATABASE ajaydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database delete");
// });

// con.query("CREATE DATABASE ajaydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database Create");
// });