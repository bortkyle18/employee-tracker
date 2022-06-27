const figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./db/connection');

const viewAllDepartments = require('./FUNC/viewAllDepartments');
const viewAllRoles = require('./FUNC/viewAllRoles');
const viewAllEmployees = require('./FUNC/viewAllEmployees');


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
                viewAllEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case "Update Employee's Role":
                updateEmployeeRole();
                break;
            default:
                endApp();
            }
        })
    .catch(err => {
            console.error(err);
        });
};


// Confirm Quit
function endApp() {
    const confirmQuit = [{
        type: 'list',
        name: 'quit',
        message: 'Are you sure you would like to exit Employee Tracker?',
        loop: false,
        choices: ['Return to Employee Tracker','Quit']
    }]
    
    inquirer.prompt(confirmQuit)
    .then(res => {
        switch (res.quit) {
            case 'Return to Employee Tracker':
                startApp();
            default:
                db.end();
        }
    })
    .catch(err => {
        console.error(err);
    });
};












// FUNCTIONS NOT IN FUNC FOLDER

// Add New Department
const addDepartment = () => {
    let question = [
        {
            type: "input",
            name: "name",
            message: "what is the name of the new department?"
        }
    ];
    inquirer.prompt(question)
    .then(data => {
        db.query(`INSERT INTO department (name) VALUES (?)`, [data.name], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added a ${data.name} department at id ${res.insertId}`);
            startApp();
        });
    })
    .catch(err => {
        console.error(err);
    });
};





// Add New Role
const addRole = () => {
    // Get the list of all departments with the department_id for a prompt question list
    const departments = [];
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        res.forEach(dpt => {
            let dObj = {
            name: dpt.name,
            value: dpt.id
            }
            departments.push(dObj);
        });
    
        let questions = [
            {
            type: "input",
            name: "title",
            message: "what is the title of the new role?"
            },
            {
            type: "input",
            name: "salary",
            message: "what is the salary of the new role?"
            },
            {
            type: "list",
            name: "department",
            choices: departments,
            message: "which department is this role in?"
            }
        ];

        inquirer.prompt(questions)
        .then(data => {
            const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
            db.query(query, [[data.title, data.salary, data.department]], (err, res) => {
            if (err) throw err;
            console.log(`Successfully inserted ${data.title} role at id ${res.insertId}`);
            startApp();
            });
        })
        .catch(err => {
            console.error(err);
        });
    });
};




// Add Emplyee
const addEmployee = () => {
    //get all the employee list to make choice of employee's manager
    db.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [
            // No Manager
            {
            name: 'None',
            value: 0
            }
        ];
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
            name: first_name + " " + last_name,
            value: id
            });
        });
        
        //get all the role list to make choice of employee's role
        db.query("SELECT * FROM ROLE", (err, rolRes) => {
            if (err) throw err;
            const roleChoice = [];
            rolRes.forEach(({ title, id }) => {
            roleChoice.push({
                name: title,
                value: id
                });
            });
        
            let questions = [
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role_id",
                choices: roleChoice,
                message: "What is the employee's role?"
            },
            {
                type: "list",
                name: "manager_id",
                choices: employeeChoice,
                message: "Who is the employee's manager? (if they have one)"
            }
            ]
        
            inquirer.prompt(questions)
            .then(data => {
                const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
                let manager_id = data.manager_id !== 0? data.manager_id: null;
                db.query(query, [[data.first_name, data.last_name, data.role_id, manager_id]], (err, res) => {
                if (err) throw err;
                console.log(`Successfully inserted employee ${data.first_name} ${data.last_name} with id ${res.insertId}`);
                startApp();
                });
            })
            .catch(err => {
                console.error(err);
            });
        })
    });
};




// Update Employee's Role
const updateEmployeeRole = () => {
    //get all the employee list 
    db.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [];
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
            name: first_name + " " + last_name,
            value: id
            });
        });
        
        //get all the role list to make choice of employee's role
        db.query("SELECT * FROM ROLE", (err, rolRes) => {
            if (err) throw err;
            const roleChoice = [];
            rolRes.forEach(({ title, id }) => {
                roleChoice.push({
                    name: title,
                    value: id
                    });
            });
        
            let questions = [
                {
                    type: "list",
                    name: "id",
                    choices: employeeChoice,
                    message: "Whose role do you want to update?"
                },
                {
                    type: "list",
                    name: "role_id",
                    choices: roleChoice,
                    message: "what is the employee's new role?"
                }
            ]
        
            inquirer.prompt(questions)
            .then(data => {
                const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
                db.query(query, [
                {role_id: data.role_id},
                "id",
                data.id
                ], (err, res) => {
                if (err) throw err;
                
                console.log("Successfully updated employee's role!");
                startApp();
                });
            })
            .catch(err => {
                console.error(err);
            });
        })
    });
};