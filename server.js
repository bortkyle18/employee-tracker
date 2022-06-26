// const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./db/connection');

// const run = require('./functions');


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


// Home Commands
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
                run.viewAllDepartments();
                break;
            case 'View All Roles':
                run.viewAllRoles();
                break;
            case 'View All Employees':
                run.viewAllEmployees();
                break;
            case 'Add Department':
                run.addDepartment();
                break;
            case 'Add Role':
                run.addRole();
                break;
            case 'Add Employee':
                run.addEmployee();
                break;
            case "Update Employee's Role":
                run.updateEmployeeRole();
                break;
            default:
                db.end();
            }
        })
    .catch(err => {
            console.error(err);
        });
};