// node modules
const inquirer = require("inquirer");

// variable declarations for the different modules
const addModule = require("./assets/js/add");
const updateModule = require("./assets/js/update");
const viewModule = require("./assets/js/view");
const deleteModule = require("./assets/js/delete");
const budgetModule = require("./assets/js/budget");

// switch function for the main prompt menu
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

// main menu prompts
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

// initiate function that starts the program and shows the main menu
async function initiate() {
    try {
        let mainSelection = await mainMenuPrompt();
        await switchMainSelection(mainSelection);
    } catch (error) {
        console.log(error)
    }
}

// start the application
initiate();

// export the initiate function for use with other modules
module.exports.initiate = initiate;