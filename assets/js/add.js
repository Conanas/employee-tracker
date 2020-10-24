const inquirer = require("inquirer");
const cTable = require("console.table");

const sqlLib = require("../sqlLib");
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    addDepartmentPrompts: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter name of department",
            name: "name"
        }])
    },

    addDepartment: async function() {
        try {
            let department = await this.addDepartmentPrompts();
            await CRUD.addDepartment(department);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    addRolePrompts: function(departments) {
        return inquirer.prompt([{
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
                choices: departments.map(item => item.name),
                name: "departmentId"
            }
        ])
    },

    addRole: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.addRolePrompts(departments);
            departments.forEach(item => {
                if (item.name === answers.departmentId) {
                    answers.departmentId = item.id;
                    return;
                }
            });
            await CRUD.addRole(answers);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    addEmployeePrompts: function(res, connection) {
        inquirer.prompt([{
                type: "confirm",
                message: "Is employee a manager?",
                name: "manager"
            },
            {
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
        ]).then(answers => {
            res.forEach(item => {
                if (item.title === answers.roleId) {
                    answers.roleId = item.id;
                    return;
                }
            });

            if (answers.manager === false) {
                inquirer.prompt([{
                    type: "rawlist",
                    message: "Choose employees manager",
                    choices: [],
                    name: "manager_id"
                }]).then(managerAnswer => {

                })
            } else {
                let query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
                connection.query(query, [answers.first_name, answers.last_name, answers.roleId], function(err) {
                    if (err) throw err;
                    indexModule.initiate();
                });
            }
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