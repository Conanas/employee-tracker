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

    getRoles: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role", function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    },

    addRole: function(answers) {
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
        connection.query(query, [answers.title, answers.salary, answers.departmentId], function(err) {
            if (err) throw err;
        })
    },

    getEmployees: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee", function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    },

    addEmployee: function(answers) {
        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err) {
            if (err) throw err;
        })
    },

    getManagers: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    },

    getEmployeesByManager: function(answers) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee WHERE manager_id=?", [answers.manager], function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    }
}