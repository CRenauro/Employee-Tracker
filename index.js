const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./db/connection')
require('console');


const employeeOptions = [
    "Rick Prue",
    "Clara Renauro",
    "Drew Yearian",
    "Kevin Grimstead",
    "Jamie Melo",
    "Brad Scharrf",
    "Linda Luke",
    "Al Spinelli",
    "Carrie Mallie",
    "Angel Mass",
    "exit"
];

const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Update Employee",
    "Add Department",
    "Add Role",
    "Add An Employee",
    "Delete Department",
    "Delete Role",
    "Remove An Employee",
    "View total budget",
    "exit"
];

const updateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "exit"
];


runSearch();



function runSearch() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: viewOptions
    })
    .then(function (answer) {
        switch (answer.action) {
            case viewOptions[0]:
                departmentView();
                break;

            case viewOptions[1]:
                roleView();
                break;

            case viewOptions[2]:
                employeeView();
                break;

            case viewOptions[3]:
                employeeView();
                break;

            case viewOptions[4]:
                departmentView();
                break;

            case viewOptions[5]:
                roleView();
                break;

            case viewOptions[6]:
                employeeView();
                break;
                
            case viewOptions[7]:
                departmentView();
                break; 
                
            case viewOptions[8]:
                roleView();
                break;

            case viewOptions[9]:
                employeeView();
                break;

            case viewOptions[10]:
                departmentView();
                break;
     
            case promptMessages.exit:
                connection.end();
                break;

        }
    })
}

function departmentView() {
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}

function employeeView() {
    var sqlStr = "SELECT first_name, last_name, title, salary FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        runSearch();
    })
}

function roleView() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        runSearch();
    })
}



const updateEmployee = () => {
    function runUpdateSearch() {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "Which employee do you want to update?",
            choices: employeeOptions
        })
    }
    runUpdateSearch();
}

