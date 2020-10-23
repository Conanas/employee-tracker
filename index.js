const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const { inherits } = require("util");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initiate();
});

function addDepartmentPrompts() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter name of department",
        name: "departmentName"
    }])
}

async function addDepartment() {
    try {
        let add = await addDepartmentPrompts();
        query = `INSERT INTO department (name) VALUES (?)`;
        connection.query(query, [add.departmentName], function(err, res) {
            if (err) throw err;
            initiate();
        })
    } catch (error) {
        console.log(error);
    }
}

function addSelectionSwitch(addSelection) {
    switch (addSelection.addSelection) {
        case ("Department"):
            addDepartment();
            break;
        case ("Role"):

            break;
        case ("Employee"):

            break;
        case ("Back"):
            initiate();
            break;
        default:
            console.log("Add Switch Error");
    }
}

function addToDatabasePrompts() {
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
}

async function addToDatabase() {
    try {
        let addSelection = await addToDatabasePrompts();
        addSelectionSwitch(addSelection);
    } catch (error) {
        console.log(error);
    }
}

function viewDatabasePrompts() {
    console.log("viewing db")
}

function updateDatabasePrompts() {
    console.log("updating db")
}

function deleteFromDatabasePrompts() {
    console.log("deleting from db")
}

function switchMainSelection(mainSelection) {
    switch (mainSelection.selection) {
        case ("Add to Database"):
            addToDatabase();
            break;
        case ("View Database"):
            viewDatabasePrompts();
            break;
        case ("Update Database"):
            updateDatabasePrompts();
            break;
        case ("Delete from Database"):
            deleteFromDatabasePrompts();
            break;
        case ("Exit"):
            console.log("Exiting Program")
            connection.end;
            process.exit(-1);
        default:
            console.log("Switch Error");
    }
}

// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department

function mainMenuPrompt() {
    return inquirer.prompt([{
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add to Database",
            "View Database",
            "Update Database",
            "Delete from Database",
            "Exit"
        ],
        name: "selection"
    }])
}

async function initiate() {
    try {
        let mainSelection = await mainMenuPrompt();
        switchMainSelection(mainSelection);
    } catch (error) {
        console.log(error)
    }
}