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
            await CRUD.addDepartment(department);
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
                type: "rawlist",
                message: "Enter department",
                choices: departments.map(item => item.name),
                name: "departmentId"
            }
        ])
    },

    addRole: async function() {
        try {
            let departments = await CRUD.getDepartments();
            let answers = await this.addRolePrompts(departments);
            departments.forEach(item => {
                if (item.name === answers.departmentId) {
                    answers.departmentId = item.id;
                    return;
                }
            });
            await CRUD.addRole(answers);
            indexModule.initiate();
        } catch (error) {
            console.log(error);
        }
    },

    addEmployeePrompts: function(employees, roles) {
        rolesList = roles.map(item => item.title);
        employeeList = employees.map(item => `${item.first_name} ${item.last_name}`);
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
                type: "rawlist",
                message: "Enter role",
                choices: rolesList,
                name: "role_id"
            },
            {
                type: "rawlist",
                message: "Select manager of employee",
                choices: ["No manager"].concat(employeeList),
                name: "manager_id"
            }
        ]);
    },

    addEmployee: async function() {
        try {
            let roles = await CRUD.getRoles();
            let employees = await CRUD.getEmployees();
            let answers = await this.addEmployeePrompts(employees, roles);
            if (answers.manager_id != "No manager") {
                managerSplit = answers.manager_id.split(" ");
                employees.forEach(employee => {
                    if (employee.first_name === managerSplit[0] && employee.last_name === managerSplit[1]) {
                        answers.manager_id = employee.id;
                        return;
                    }
                });
            } else {
                answers.manager_id = null;
            }
            roles.forEach(role => {
                if (role.title === answers.role_id) {
                    answers.role_id = role.id;
                    return;
                }
            });
            await CRUD.addEmployee(answers);
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