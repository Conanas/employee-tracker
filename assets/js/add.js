const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

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
            let query = `INSERT INTO department (name) VALUES ("${add.departmentName}")`;
            return query;
        } catch (error) {
            console.log(error);
        }
    },

    addSelectionSwitch: function(addSelection) {
        switch (addSelection.addSelection) {
            case ("Department"):
                return this.addDepartment();
            case ("Role"):

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
            return this.addSelectionSwitch(addSelection);
        } catch (error) {
            console.log(error);
        }
    }
}