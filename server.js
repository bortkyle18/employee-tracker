// const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./db/connection');

const viewAllDepartments = require('./FUNC/viewAllDepartments');
const viewAllRoles = require('./FUNC/viewAllRoles');
const viewAllEmployees = require('./FUNC/viewAllEmployees');
// const addDepartment = require('./FUNC/addDepartment');
// const addRole = require('./FUNC/addRole');
// const addEmployee = require('./FUNC/addEmployee');
// const updateEmployeeRole = require('./FUNC/updateEmployeeRole');


// Connect to the DB
db.connect((err) => {
    if (err) throw err;
    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('ascii art not loaded');
        } else {
            console.log(data);
        }  
        startApp();
    });
});


// Main Menu Prompts
function startApp() {
    const startQuestions = [{
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
        loop: false,
        choices: ['View All Departments','View All Roles','View All Employees','Add Department','Add Role','Add Employee',"Update Employee's Role",'quit']
    }]
    
    inquirer.prompt(startQuestions)
    .then(res => {
        switch (res.action) {
            case 'View All Departments':
                viewAllDepartments(),
                startApp();
                break;
            case 'View All Roles':
                viewAllRoles(),
                startApp();
                break;
            case 'View All Employees':
                viewAllEmployees(),
                startApp();
                break;
            case 'Add Department':
                addDepartment(),
                startApp();
                break;
            case 'Add Role':
                addRole(),
                startApp();
                break;
            case 'Add Employee':
                addEmployee(),
                startApp();
                break;
            case "Update Employee's Role":
                updateEmployeeRole(),
                startApp();
                break;
            default:
                db.end();
            }
        })
    .catch(err => {
            console.error(err);
        });
};