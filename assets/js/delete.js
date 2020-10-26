// required node modules
const inquirer = require("inquirer");

// required local modules
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    //  prompts the user for a department to delete from the database
    selectDepartment: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a department to delete?",
            choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
            name: "department"
        }])
    },

    // starts the function required to delete a department from the database
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

    // prompts the user to select a role to delete from the database
    selectRole: function(roles) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a role to delete?",
            choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
            name: "role"
        }])
    },

    // starts the functions required to delete a role from the database
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

    // prompts the user to select an employee to delete from the database
    selectEmployees: function(employees) {
        return inquirer.prompt([{
            type: "list",
            message: "Select an employee to delete",
            choices: employees.map(employee => `id: ${employee.id} name: ${employee.first_name} ${employee.last_name}`),
            name: "employee"
        }])
    },

    // starts the function required to delete an employee from the database
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

    // switch statement function to choose the correct delete pathway
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

    // delete menu
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

    // starts the functions required to delete from the database
    deleteFromDatabase: async function() {
        try {
            let deleteSelection = await this.deleteSelectionPrompts();
            this.deleteSelectionSwitch(deleteSelection);
        } catch (error) {
            console.log(error);
        }
    }
}