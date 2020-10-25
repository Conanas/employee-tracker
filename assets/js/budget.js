const inquirer = require("inquirer");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    viewDepartmentsPrompts: function(departments) {
        return inquirer.prompt([{
            type: "list",
            message: "Select a department to view budget",
            choices: departments.map(department => `id: ${department.id} name: ${deparment.name}`),
            name: "department"
        }])
    },

    viewBudgets: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.viewDepartmentsPrompt(departments);
            answers.id = answers.department.split(" ")[1];
            // await CRUD.get
        } catch (error) {
            console.log(error);
        }
    }
}