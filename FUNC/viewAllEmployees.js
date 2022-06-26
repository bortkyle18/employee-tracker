const db = require("../db/connection");
const cTable = require('console.table');

const viewAllEmployees = () => {
    db.query(`SELECT E.id, E.first_name, E.last_name, 
                R.title AS role, D.name AS department, 
                CONCAT(M.first_name, " ", M.last_name) AS manager
                FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
                LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
                LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id;`, (err, res) => {
        if (err) throw err;
        console.table('All Employees:',res);
        return
    }
)};


module.exports = viewAllEmployees;