const inquirer = require("inquirer");
const cTable = require("console.table");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    viewBudgets: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.viewDepartmentsPrompts(departments);
            answers.id = answers.department.split(" ")[1];
            let budgetByDepartment = await CRUD.viewBudgetByDepartment(answers.id);
            console.log("\n");
            const table = cTable.getTable(budgetByDepartment);
            console.log(table);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    viewDepartmentsPrompts: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a department to view budget",
            choices: departments.map(department => `id: ${department.id} name: ${department.name}`),
            name: "department"
        }])
    }
}