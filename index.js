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
    // connection.end;
    // process.exit(-1);
});

function addToDatabasePrompts() {
    console.log("adding to db")
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
            addToDatabasePrompts();
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