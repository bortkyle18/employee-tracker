const db = require("../db/connection");
const cTable = require('console.table');

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        return
    }
)};


module.exports = viewAllDepartments;