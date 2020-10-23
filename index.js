const inquirer = require("inquirer");
const cTable = require("console.table");

const sqlLib = require("./assets/sqlLib");
const addModule = require("./assets/js/add");
const updateModule = require("./assets/js/update");
const viewModule = require("./assets/js/view");
const deleteModule = require("./assets/js/delete");

sqlLib.getConnection(function(err, connection) {
    if (err) throw err;
    initiate();
})

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "password",
//     database: "employee_db"
// })

// connection.connect(function(err) {
//     if (err) throw err;
//     initiate();
// })

function switchMainSelection(mainSelection) {
    switch (mainSelection.selection) {
        case ("Add to Database"):
            addModule.addToDatabase();
            break;
        case ("View Database"):
            // viewModule.viewDatabasePrompts();
            break;
        case ("Update Database"):
            // updateModule.updateDatabasePrompts();
            break;
        case ("Delete from Database"):
            // deleteModule.deleteFromDatabasePrompts();
            break;
        case ("Exit"):
            console.log("Exiting Program");
            sqlLib.getConnection(function(err, connection) {
                if (err) throw err;
                connection.end;
            });
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
        await switchMainSelection(mainSelection);

        // connection.query(query, function(err, res) {
        //     if (err) throw err;
        //     initiate();
        // })
    } catch (error) {
        console.log(error)
    }
}

module.exports.initiate = initiate;