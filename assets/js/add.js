const inquirer = require("inquirer");

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
                connection.query(query, [add.departmentName], function(err, res) {
                    if (err) throw err;
                    indexModule.initiate();
                });
            });
        } catch (error) {
            console.log(error);
        }
    },

    addRolePrompts: function() {
        sqlLib.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) throw err;
                console.log(res);
            });
        });
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
                message: "Enter department ID",
                name: "departmentId"
            }
        ]);
    },

    addRole: async function() {
        try {
            let add = await this.addRolePrompts();
            let query = `INSERT INTO role (title, salary, department_id) VALUES ("${add.title}", "${add.salary}", "${add.departmentId}")`;
            return query;
        } catch (error) {
            console.log(error);
        }
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