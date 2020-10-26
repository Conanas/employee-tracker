// required node modules
const inquirer = require("inquirer");

// required local modules
const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    // prompts and returns a name for the new department
    addDepartmentPrompts: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter name of department",
            name: "name"
        }])
    },

    // start functions required to add a new department to the database
    addDepartment: async function() {
        try {
            // starts the add department prompts and returns an answer object with the new information of teh new department
            let department = await this.addDepartmentPrompts();

            // adds the department to the database with the new information
            await CRUD.addDepartment(department.name);

            // goes back to the main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // prompts and returns info for a new role
    // uses retrieved departments to generate a list for the user to choose the department the new role is associated with
    addRolePrompts: function(departments) {
        return inquirer.prompt([{
                type: "input",
                message: "Enter name of role",
                name: "title"
            },
            {
                type: "input",
                message: "Enter salary amount per year",
                name: "salary"
            },
            {
                type: "list",
                message: "Enter department",
                // returns an array of departments for the user to choose
                choices: departments.map(item => `id: ${item.id} name: ${item.name}`),
                name: "department"
            }
        ])
    },

    // starts the functions required to add a new role to the database
    addRole: async function() {
        try {
            // retrieves departments from the database to be used to choose a department for a new role
            let departments = await CRUD.getDepartments();

            // prompts the user for role information and returns the inputs as a object
            let answers = await this.addRolePrompts(departments);

            // assigns a department_id to answers
            // department_id retrieved from answers.department by splitting the string by whitespace and returning the 1st index item
            answers.department_id = answers.department.split(" ")[1];

            // add new role to database using inputted answers
            await CRUD.addRole(answers.title, answers.salary, answers.department_id);

            // go back to the main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // prompts the user for new employee information and returns the answers
    // uses the existing list of employees and roles to assign the new employee with a manager and role_id
    addEmployeePrompts: function(employees, roles) {

        // returns an array of strings that indicate the employees id and name
        employeeList = employees.map(employee => `id: ${employee.id} name: ${employee.first_name} ${employee.last_name}`);
        return inquirer.prompt([{
                type: "input",
                message: "Enter first name of employee",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter last name of employee",
                name: "last_name"
            },
            {
                type: "list",
                message: "Enter role",
                // creates a string array with the info for each role id and title
                choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
                name: "role"
            },
            {
                type: "list",
                message: "Select manager of employee",
                // adds "No manager" option to the list of employees that are potential managers for new employee
                choices: ["No manager"].concat(employeeList),
                name: "manager"
            }
        ]);
    },

    // starts the functions required to add a new employee to the database
    addEmployee: async function() {
        try {
            // retrieves and stores all the roles from the database
            let roles = await CRUD.getRoles();

            // retrieves and stores all the employees from the database
            let employees = await CRUD.getEmployees();

            // returns an object of the answers from the user
            let answers = await this.addEmployeePrompts(employees, roles);

            // if the new employee has a manager assigned
            if (answers.manager != "No manager") {

                // retrieve the managers id from the answers and assign to answers.manager_id
                answers.manager_id = answers.manager.split(" ")[1];
            } else {

                // manager_id is null
                answers.manager_id = null;
            }

            // finds the role_id from the answers object and assigns it to answers.role_id
            answers.role_id = answers.role.split(" ")[1];

            // adds new employee to the database
            await CRUD.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);

            // goes back to the main menu
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    // switch statement function for user input prompt path
    addSelectionSwitch: function(addSelection) {
        switch (addSelection.addSelection) {
            case ("Department"):
                this.addDepartment();
                break;
            case ("Role"):
                this.addRole();
                break;
            case ("Employee"):
                this.addEmployee();
                break;
            case ("Back"):
                indexModule.initiate();
                break;
            default:
                console.log("Add Switch Error");
        }
    },

    // add menu prompts
    addToDatabasePrompts: function() {
        return inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee",
                "Back"
            ],
            name: "addSelection"
        }]);
    },

    // starts the add functions
    addToDatabase: async function() {
        try {
            let addSelection = await this.addToDatabasePrompts();
            this.addSelectionSwitch(addSelection);
        } catch (error) {
            console.log(error);
        }
    }

}