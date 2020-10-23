var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            return callback(err);
        }
        callback(err, conn);
    });
};