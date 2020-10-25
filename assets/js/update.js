const inquirer = require("inquirer");
const cTable = require("console.table");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    selectDepartment: function(departments) {
        return inquirer.prompt([{
                type: "list",
                message: "Which department would you like to update?",
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

    selectRole: function(roles, departments) {
        return inquirer.prompt([{
                type: "list",
                message: "Which role would you like to edit?",
                choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
                name: "role"
            },
            {
                type: "input",
                message: "Enter new role title",
                name: "title"
            },
            {
                type: "input",
                message: "Enter new role salary",
                name: "salary"
            },
            {
                type: "list",
                message: "Select department for role",
                choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
                name: "department"
            }
        ])
    },

    updateRoles: async function() {
        try {
            let roles = await CRUD.getRoles();
            let departments = await CRUD.getDepartments();
            let answers = await this.selectRole(roles, departments);
            answers.id = answers.role.split(" ")[1];
            answers.department_id = answers.department.split(" ")[1];
            await CRUD.updateRole(answers.id, answers.title, answers.salary, answers.department_id);
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