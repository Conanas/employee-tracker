// required node modules
const inquirer = require("inquirer");

// required local modules
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    // presents a list of the departments to the user for them to update
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

    // starts the function to update a department
    updateDepartments: async function() {
        try {
            // retrieves the departments from teh database
            let departments = await CRUD.getDepartments();

            // prompt the user for department selection and store the answer
            let answers = await this.selectDepartment(departments);

            // retrieves the department id from the answers
            answers.id = answers.department.split(" ")[1];

            // updates the department in the database
            await CRUD.updateDepartment(answers.id, answers.newName);

            // back to main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // prompt for the user to select a role to update and
    // prompts for the new information for that role
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

    // starts the functions to update a role
    updateRoles: async function() {
        try {
            // retrieves the roles from the database
            let roles = await CRUD.getRoles();

            // retrieves the departments from the database
            let departments = await CRUD.getDepartments();

            // retrieves the information to update the selected role 
            let answers = await this.selectRole(roles, departments);

            // retrieves the role id from answers and assigns it
            answers.id = answers.role.split(" ")[1];

            // retrieves teh department id the role is associated with from answers
            answers.department_id = answers.department.split(" ")[1];

            // updates the role in the database with the new information
            await CRUD.updateRole(answers.id, answers.title, answers.salary, answers.department_id);

            // back to main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // prompts to select an employee to update
    selectEmployee: function(employees, roles, managers) {
        return inquirer.prompt([{
                type: "list",
                message: "Which employee would you like to edit?",
                choices: employees.map(employee => `id: ${employee.id} name: ${employee.first_name} ${employee.last_name}`),
                name: "employee"
            },
            {
                type: "input",
                message: "Enter employee first name",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "last_name"
            },
            {
                type: "list",
                message: "Select employees role",
                choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
                name: "role"
            },
            {
                type: "list",
                message: "Enter employees manager",
                choices: ["No manager"].concat(managers.map(manager => `id: ${manager.id} name: ${manager.first_name} ${manager.last_name}`)),
                name: "manager"
            }
        ])
    },

    // start functions required to update employee
    updateEmployees: async function() {
        try {

            // gets all roles from the database
            let roles = await CRUD.getRoles();

            // gets all the managers from the database
            let managers = await CRUD.getManagers();

            // gets all the employees from the database
            let employees = await CRUD.getEmployees();

            // gets the answers from the prompts for the new employee
            let answers = await this.selectEmployee(employees, roles, managers);

            // gets the employee id from the answers and assigns it
            answers.id = answers.employee.split(" ")[1];

            // gets the role id from the answers and assigns it
            answers.role_id = answers.role.split(" ")[1];

            // if there is no manager then assign as null otherwise retrieve and assign the manager id
            if (answers.manager === "No manager") {
                answers.manager_id = null;
            } else {
                answers.manager_id = answers.manager.split(" ")[1];
            }

            // update the employee with the new information
            await CRUD.updateEmployee(answers.id, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);

            // back to main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // switch statement function to choose what to update
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
            case ("Back"):
                indexModule.initiate();
                break;
            default:
                console.log("Update Switch Error");
        }
    },

    // update menu prompts
    updateSelectionPrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to update?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Back"
            ],
            name: "updateSelection"
        }])
    },

    // starts the functions to update the database
    updateDatabase: async function() {
        try {
            let updateSelection = await this.updateSelectionPrompts();
            this.updateSelectionSwitch(updateSelection);
        } catch (error) {
            console.log(error);
        }
    }
}