// required node modules
const inquirer = require("inquirer");
const cTable = require("console.table");

// required local modules
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    // retrieves the departments from the database and displays them to the console as a table
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

    // retrieves the roles from the database and displays them to the console as a table
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

    // retrieves the employees from the database and displays them to the console as a table
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

    // prompts for the manager
    viewEmployeesByManagerPrompts: function(managers) {
        return inquirer.prompt([{
            type: "list",
            message: "Select manager",
            choices: managers.map(manager => `id: ${manager.id} name: ${manager.first_name} ${manager.last_name}`),
            name: "manager"
        }])
    },

    // retrieves the employees under a certain manager from the database and displays them to the console as a table
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

    // switch function for menu pathway
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
            case ("Back"):
                indexModule.initiate();
                break;
            default:
                console.log("View Switch Error");
        }
    },

    // view menu
    viewSelectionPrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Employees by manager",
                "Back"
            ],
            name: "viewSelection"
        }])
    },

    // starts the view database functions
    viewDatabase: async function() {
        try {
            let viewSelection = await this.viewSelectionPrompts();
            this.viewSelectionSwitch(viewSelection);
        } catch (error) {
            console.log(error);
        }
    }
}