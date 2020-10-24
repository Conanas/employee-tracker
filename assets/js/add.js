const inquirer = require("inquirer");
const cTable = require("console.table");

const sqlLib = require("../sqlLib");
const indexModule = require("../../index");

module.exports = {

    addDepartmentPrompts: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter name of department",
            name: "departmentName"
        }])
    },

    addDepartment: async function() {
        try {
            let add = await this.addDepartmentPrompts();
            let query = `INSERT INTO department (name) VALUES (?)`;
            sqlLib.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(query, [add.departmentName], function(err) {
                    if (err) throw err;
                    indexModule.initiate();
                });
            });
        } catch (error) {
            console.log(error);
        }
    },

    addRolePrompts: function(res, connection) {
        inquirer.prompt([{
                type: "input",
                message: "Enter name of role",
                name: "title"
            },
            {
                type: "input",
                message: "Enter salary amount per year",
                name: "salary"
            },
            {
                type: "rawlist",
                message: "Enter department",
                choices: res.map(item => item.name),
                name: "departmentId"
            }
        ]).then(function(answers) {
            res.forEach(item => {
                if (item.name === answers.departmentId) {
                    answers.departmentId = item.id;
                    return;
                }
            });
            let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(query, [answers.title, answers.salary, answers.departmentId], function(err) {
                if (err) throw err;
                indexModule.initiate();
            });
        });
    },

    addRole: function() {
        sqlLib.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                this.addRolePrompts(res, connection);
            });
        });
    },

    addEmployeePrompts: function(res, connection) {
        inquirer.prompt([{
                type: "input",
                message: "Enter first name of employee",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter last name of employee",
                name: "last_name"
            },
            {
                type: "rawlist",
                message: "Enter role",
                choices: res.map(item => item.title),
                name: "roleId"
            }
        ]).then(function(answers) {
            res.forEach(item => {
                if (item.title === answers.roleId) {
                    answers.roleId = item.id;
                    return;
                }
            });
            let query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            connection.query(query, [answers.first_name, answers.last_name, answers.roleId], function(err) {
                if (err) throw err;
                indexModule.initiate();
            });
        });
    },

    addEmployee: function() {
        sqlLib.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("SELECT * FROM role", (err, res) => {
                if (err) throw err;
                this.addEmployeePrompts(res, connection);
            });
        });
    },

    addSelectionSwitch: function(addSelection) {
        switch (addSelection.addSelection) {
            case ("Department"):
                this.addDepartment();
                break;
            case ("Role"):
                this.addRole();
                break;
            case ("Employee"):
                this.addEmployee();
                break;
            case ("Back"):
                indexModule.initiate();
                break;
            default:
                console.log("Add Switch Error");
        }
    },

    addToDatabasePrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee",
                "Back"
            ],
            name: "addSelection"
        }]);
    },

    addToDatabase: async function() {
        try {
            let addSelection = await this.addToDatabasePrompts();
            this.addSelectionSwitch(addSelection);
        } catch (error) {
            console.log(error);
        }
    }

}