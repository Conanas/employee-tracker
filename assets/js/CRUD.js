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

    addDepartment: function(name) {
        let query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query, [name], function(err) {
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

    addRole: function(title, salary, department_id) {
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
        connection.query(query, [title, salary, department_id], function(err) {
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

    addEmployee: function(first_name, last_name, role_id, manager_id) {
        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(query, [first_name, last_name, role_id, manager_id], function(err) {
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

    getEmployeesByManager: function(manager_id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee WHERE manager_id=?", [manager_id], function(err, res) {
                if (err) reject(err);
                resolve(res);
            })
        })
    },

    updateDepartment: function(id, newName) {
        let query = "UPDATE department SET name=? WHERE id=?"
        connection.query(query, [newName, id], function(err) {
            if (err) throw err;
        })
    },

    updateRole: function(id, title, salary, department_id) {
        let query = "UPDATE role SET title=?, salary=?, department_id=? WHERE id=?"
        connection.query(query, [title, salary, department_id, id], function(err) {
            if (err) throw err;
        })
    },

    updateEmployee: function(id, first_name, last_name, role_id, manager_id) {
        let query = "UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE id=?"
        connection.query(query, [first_name, last_name, role_id, manager_id, id], function(err) {
            if (err) throw err;
        })
    },

    deleteDepartment: function(id) {
        let query = "DELETE FROM department WHERE id=?"
        connection.query(query, [id], function(err) {
            if (err) throw err;
        })
    }
}