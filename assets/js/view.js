const inquirer = require("inquirer");
const cTable = require("console.table");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    viewDepartments: async function() {
        try {
            let departments = await CRUD.getDepartments();
            console.log("\n");
            const table = cTable.getTable(departments);
            console.log(table);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    viewRoles: async function() {
        try {
            let roles = await CRUD.getRoles();
            console.log("\n");
            const table = cTable.getTable(roles);
            console.log(table);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    viewEmployees: async function() {
        try {
            let employees = await CRUD.getEmployees();
            console.log("\n");
            const table = cTable.getTable(employees);
            console.log(table);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    viewEmployeesByManagerPrompts: function(managers) {
        return inquirer.prompt([{
            type: "list",
            message: "Select manager",
            choices: managers.map(manager => `id: ${manager.id} name: ${manager.first_name} ${manager.last_name}`),
            name: "manager"
        }])
    },

    viewEmployeesByManager: async function() {
        try {
            let managers = await CRUD.getManagers();
            let answers = await this.viewEmployeesByManagerPrompts(managers);
            answers.manager_id = answers.manager.split(" ")[1];
            let employeesByManager = await CRUD.getEmployeesByManager(answers.manager_id);
            if (employeesByManager.length === 0) {
                console.log("\nNo employees under this manager\n");
            } else {
                console.log("\n");
                const table = cTable.getTable(employeesByManager);
                console.log(table);
            }
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    viewSelectionSwitch(viewSelection) {
        switch (viewSelection.viewSelection) {
            case ("Departments"):
                this.viewDepartments();
                break;
            case ("Roles"):
                this.viewRoles();
                break;
            case ("Employees"):
                this.viewEmployees();
                break;
            case ("Employees by manager"):
                this.viewEmployeesByManager();
                break;
            default:
                console.log("View Switch Error");
        }
    },

    viewSelectionPrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Employees by manager"
            ],
            name: "viewSelection"
        }])
    },

    viewDatabase: async function() {
        try {
            let viewSelection = await this.viewSelectionPrompts();
            this.viewSelectionSwitch(viewSelection);
        } catch (error) {
            console.log(error);
        }
    }
}