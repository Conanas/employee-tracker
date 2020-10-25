const inquirer = require("inquirer");

const addModule = require("./assets/js/add");
const updateModule = require("./assets/js/update");
const viewModule = require("./assets/js/view");
const deleteModule = require("./assets/js/delete");
const budgetModule = require("./assets/js/budget");

function switchMainSelection(mainSelection) {
    switch (mainSelection.selection) {
        case ("Add to Database"):
            addModule.addToDatabase();
            break;
        case ("View Database"):
            viewModule.viewDatabase();
            break;
        case ("Update Database"):
            updateModule.updateDatabase();
            break;
        case ("Delete from Database"):
            deleteModule.deleteFromDatabase();
            break;
        case ("View utilized budget of a department"):
            budgetModule.viewBudgets();
            break;
        case ("Exit"):
            console.log("Exiting Program");
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
            "View utilized budget of a department",
            "Exit"
        ],
        name: "selection"
    }])
}

async function initiate() {
    try {
        let mainSelection = await mainMenuPrompt();
        await switchMainSelection(mainSelection);
    } catch (error) {
        console.log(error)
    }
}

initiate();

module.exports.initiate = initiate;