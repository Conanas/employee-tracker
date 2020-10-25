const inquirer = require("inquirer");

const indexModule = require("../../index");
const CRUD = require("./CRUD");

module.exports = {

    addDepartmentPrompts: function() {
        return inquirer.prompt([{
            type: "input",
            message: "Enter name of department",
            name: "name"
        }])
    },

    addDepartment: async function() {
        try {
            let department = await this.addDepartmentPrompts();
            await CRUD.addDepartment(department.name);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

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
                choices: departments.map(item => `id: ${item.id} name: ${item.name}`),
                name: "department"
            }
        ])
    },

    addRole: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.addRolePrompts(departments);
            answers.department_id = answers.department.split(" ")[1];
            await CRUD.addRole(answers.title, answers.salary, answers.department_id);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    addEmployeePrompts: function(employees, roles) {
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
                choices: roles.map(role => `id: ${role.id} title: ${role.title}`),
                name: "role"
            },
            {
                type: "list",
                message: "Select manager of employee",
                choices: ["No manager"].concat(employeeList),
                name: "manager"
            }
        ]);
    },

    addEmployee: async function() {
        try {
            let roles = await CRUD.getRoles();
            let employees = await CRUD.getEmployees();
            let answers = await this.addEmployeePrompts(employees, roles);
            if (answers.manager != "No manager") {
                answers.manager_id = answers.manager.split(" ")[1];
            } else {
                answers.manager_id = null;
            }
            answers.role_id = answers.role.split(" ")[1];
            await CRUD.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

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

    addToDatabase: async function() {
        try {
            let addSelection = await this.addToDatabasePrompts();
            this.addSelectionSwitch(addSelection);
        } catch (error) {
            console.log(error);
        }
    }

}