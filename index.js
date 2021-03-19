const mysql = require("mysql");
const inquirer = require("inquirer");
require("console");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "employeeDB"
});



function start() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "View All Employeees By Department",
            "View All Employees By Manager",
            "Add An Employee",
            "Remove An Employee",
            "Update Employee Role",
            "View All Roles"
        ]
    })
    .then(response => {
        console.log('answer', answer);
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Employeees By Department":
                viewByDepartment();
                break;

            case "View All Employees By Manager":
                viewByManager();
                break;

            case "Add An Employee":
                addEmployee();
                break;

            case "Remove An Employee":
                remove('delete');
                break;

            case "Update Employee Role":
                remove('role');
                break;

            case "View All Roles":
                viewAllRoles();
                break;
                
            case promptMessages.exit:
                connection.end();
                break;

        }
    });
}

