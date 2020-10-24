const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

module.exports = {
    getDepartments: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    },

    addDepartment: function(department) {
        let query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query, [department.name], function(err) {
            if (err) throw err;
        })
    },

    addRole: function(answers) {
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
        connection.query(query, [answers.title, answers.salary, answers.departmentId], function(err) {
            if (err) throw err;
        })
    }
}