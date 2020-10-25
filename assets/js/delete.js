const inquirer = require("inquirer");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    selectDepartment: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a department to delete?",
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

    selectRole: function(roles) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a role to delete?",
            choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
            name: "role"
        }])
    },

    deleteRoles: async function() {
        try {
            let roles = await CRUD.getRoles();
            let answers = await this.selectRole(roles);
            answers.id = answers.role.split(" ")[1];
            await CRUD.deleteRole(answers.id);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    selectEmployees: function(employees) {
        return inquirer.prompt([{
            type: "list",
            message: "Select an employee to delete",
            choices: employees.map(employee => `id: ${employee.id} name: ${employee.first_name} ${employee.last_name}`),
            name: "employee"
        }])
    },

    deleteEmployees: async function() {
        try {
            let employees = await CRUD.getEmployees();
            let answers = await this.selectEmployees(employees);
            answers.id = answers.employee.split(" ")[1];
            await CRUD.deleteEmployee(answers.id);
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