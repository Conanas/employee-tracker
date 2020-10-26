// required node modules
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

    // gets all the departments from the department table
    getDepartments: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    },

    // adds a department to the department table
    addDepartment: function(name) {
        let query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query, [name], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // retrieves all the roles from the role table
    getRoles: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role", function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    },

    // adds a new role to the role table
    addRole: function(title, salary, department_id) {
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
        connection.query(query, [title, salary, department_id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // retrieves all the employees from the employee table
    getEmployees: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee", function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    },

    // adds an employee to the employee table
    addEmployee: function(first_name, last_name, role_id, manager_id) {
        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(query, [first_name, last_name, role_id, manager_id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // retrieves all the managers from the employee table
    getManagers: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    },

    // retrieves a table of employees under a manager from the employee table
    getEmployeesByManager: function(manager_id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee WHERE manager_id=?", [manager_id], function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    },

    // updates a department in the department table
    updateDepartment: function(id, newName) {
        let query = "UPDATE department SET name=? WHERE id=?"
        connection.query(query, [newName, id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // updates a role in the role table
    updateRole: function(id, title, salary, department_id) {
        let query = "UPDATE role SET title=?, salary=?, department_id=? WHERE id=?"
        connection.query(query, [title, salary, department_id, id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // updates an employee in the employee table
    updateEmployee: function(id, first_name, last_name, role_id, manager_id) {
        let query = "UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE id=?"
        connection.query(query, [first_name, last_name, role_id, manager_id, id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // deletes a department from the department table
    deleteDepartment: function(id) {
        let query = "DELETE FROM department WHERE id=?"
        connection.query(query, [id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // deletes a role from the role table
    deleteRole: function(id) {
        let query = "DELETE FROM role WHERE id=?"
        connection.query(query, [id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // deletes an employee from the employee table
    deleteEmployee: function(id) {
        let query = "DELETE FROM employee WHERE id=?"
        connection.query(query, [id], function(err) {
            if (err) throw err;
            connection.end;
        })
    },

    // retrieves the sum of the salaries of employees assigned to certain roles associated to a department
    viewBudgetByDepartment: function(department_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT CONCAT('$', format(SUM(role.salary), 2))
            AS "Budget"
            FROM role
            INNER JOIN employee 
            ON role.id=employee.role_id
            WHERE role.department_id=?`;
            connection.query(query, [department_id], function(err, res) {
                if (err) reject(err);
                connection.end;
                resolve(res);
            })
        })
    }
}