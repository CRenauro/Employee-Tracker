const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./db/connection');
const { readdirSync } = require('fs');
const { start } = require('repl');
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
    "Add An Employee",
    "Add a Department",
    "Add a Role",
    "exit"
];

const updateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "exit"
];


startApp();


function startApp() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: viewOptions
    })
    .then(function (answer) {
        switch (answer.action) {
            case viewOptions[0]:
                departmentView(); //view departments
                break;

            case viewOptions[1]: //view roles
                roleView();
                break;

            case viewOptions[2]: //view employees
                employeeView();
                break;

            case viewOptions[3]: //add an employee
                addEmployee();
                break;

            case viewOptions[4]: // add a department
                addDepartment();
                break;

            case viewOptions[5]: // add a role
                addRole();
                break;
     
            case "promptMessages.exit":
                connection.end();
                break;
            default:
                break;

        }
    })
}

function departmentView() {
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        startApp();
    })
}

function employeeView() {
    var sqlStr = "SELECT first_name, last_name, title, salary FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        startApp();
    })
}

function roleView() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        startApp();
    })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < result.length; i++) {
                    roleArray.push(result[i].title);
                }
                    return roleArray;
                },
                message: "What is the employee's role?"
            }
            ]).then(function (answer) {
                let roleID;
                for (let j = 0; j < result.length; j++) {
                if (result[j].title == answer.role) {
                    roleID = result[j].id;
                    console.log(roleID)
                }
                }
                connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee has been added");
                    startApp();
            }
            )
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "new_dept",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
            var query = "SELECT * FROM department";
            connection.query(query, function(err, result) {
                if (err)throw err;
                console.table('All Departments:', result);
                startApp();
            })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        inquirer.prompt ([
            {
                name: "new_role",
                type: "input",
                message: "What is the TITLE of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this position?"
            },
            {
                name:"deptChoice",
                type: "list",
                choices: function() {
                    var deptArray = [];
                    for (let i = 0; i < result.length; i++) {
                        deptArray.push(result[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let deptID;
            for (let i = 0; i < result.length; i++) {
                if (result[i].name == answer.deptChoice) {
                    deptID = result[i].id;
                }
            }
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: deptID
                },
                function (err, result) {
                    if(err)throw err;
                        console.log("Your new role is added.");
                        startApp();
                }
                
            )
        })
    })
}

function endApp() {
    connection.end();
}