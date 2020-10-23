const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const { inherits } = require("util");
const { Module } = require("module");

const addModule = require("./assets/js/add");
const viewModule = require("./assets/js/view");
const updateModule = require("./assets/js/update");
const deleteModule = require("./assets/js/delete");
const { connect } = require("http2");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db"
})

connection.connect(function(err) {
    if (err) throw err;
    initiate();
})

function switchMainSelection(mainSelection) {
    switch (mainSelection.selection) {
        case ("Add to Database"):
            return addModule.addToDatabase();
        case ("View Database"):
            return viewModule.viewDatabasePrompts();
        case ("Update Database"):
            return updateModule.updateDatabasePrompts();
        case ("Delete from Database"):
            return deleteModule.deleteFromDatabasePrompts();
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
        let query = await switchMainSelection(mainSelection);
        connection.query(query, function(err, res) {
            if (err) throw err;
            initiate();
        })
    } catch (error) {
        console.log(error)
    }
}