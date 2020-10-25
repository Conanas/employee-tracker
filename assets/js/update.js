const inquirer = require("inquirer");
const cTable = require("console.table");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    selectDepartment: function(departments) {
        return inquirer.prompt([{
                type: "list",
                message: "which department would you like to update?",
                choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
                name: "department"
            },
            {
                type: "input",
                message: "Enter new name for department",
                name: "newName"
            }
        ])
    },

    updateDepartments: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.selectDepartment(departments);
            answers.id = answers.department.split(" ")[1];
            await CRUD.updateDepartment(answers.id, answers.newName);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    updateSelectionSwitch(updateSelection) {
        switch (updateSelection.updateSelection) {
            case ("Departments"):
                this.updateDepartments();
                break;
            case ("Roles"):
                this.updateRoles();
                break;
            case ("Employees"):
                this.updateEmployees();
                break;
            default:
                console.log("Update Switch Error");
        }
    },

    updateSelectionPrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to update?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
            ],
            name: "updateSelection"
        }])
    },

    updateDatabase: async function() {
        try {
            let updateSelection = await this.updateSelectionPrompts();
            this.updateSelectionSwitch(updateSelection);
        } catch (error) {
            console.log(error);
        }
    }
}