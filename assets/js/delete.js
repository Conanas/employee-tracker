const inquirer = require("inquirer");
const cTable = require("console.table");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    selectDepartment: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Which department would you like to delete?",
            choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
            name: "department"
        }])
    },

    deleteDepartments: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.selectDepartment(departments);
            answers.id = answers.department.split(" ")[1];
            await CRUD.deleteDepartment(answers.id);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    deleteSelectionSwitch(deleteSelection) {
        switch (deleteSelection.deleteSelection) {
            case ("Departments"):
                this.deleteDepartments();
                break;
            case ("Roles"):
                this.deleteRoles();
                break;
            case ("Employees"):
                this.deleteEmployees();
                break;
            case ("Back"):
                indexModule.initiate();
                break;
            default:
                console.log("Delete Switch Error");
        }
    },

    deleteSelectionPrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to delete?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Back"
            ],
            name: "deleteSelection"
        }])
    },

    deleteFromDatabase: async function() {
        try {
            let deleteSelection = await this.deleteSelectionPrompts();
            this.deleteSelectionSwitch(deleteSelection);
        } catch (error) {
            console.log(error);
        }
    }
}