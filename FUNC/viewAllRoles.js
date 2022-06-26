const db = require("../db/connection");
const cTable = require('console.table');

const viewAllRoles = () => {
    db.query(`SELECT R.id AS id, title, salary, D.name AS department
                FROM ROLE AS R LEFT JOIN DEPARTMENT AS D
                ON R.department_id = D.id;`, (err, res) => {
        if (err) throw err;
        console.table('All Roles:',res);
        return
    }
)};


module.exports = viewAllRoles;