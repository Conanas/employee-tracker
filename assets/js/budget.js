// required node modules
const inquirer = require("inquirer");
const cTable = require("console.table");

// required local modules
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    // prompts the user to select a department
    viewDepartmentsPrompts: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a department to view budget",
            choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
            name: "department"
        }])
    },

    // starts the functions required to view the utilised budget of a department
    viewBudgets: async function() {
        try {
            // retrieves teh departments from teh database
            let departments = await CRUD.getDepartments();

            // retrieves the selected department to view the budget
            let answers = await this.viewDepartmentsPrompts(departments);

            // retrieves and stores the department id from the answers
            answers.id = answers.department.split(" ")[1];

            // retrieves the budget of the chosen department
            let budgetByDepartment = await CRUD.viewBudgetByDepartment(answers.id);

            // displays the budget spent to the console
            console.log("\n");
            const table = cTable.getTable(budgetByDepartment);
            console.log(table);

            // back to main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    }
}