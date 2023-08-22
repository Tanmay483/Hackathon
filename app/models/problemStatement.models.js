const sql = require('../config/db');

// constructor
const Problem = function (problem) {

    this.hId = problem.hId;
    this.theId = problem.theId;
    this.vProblemStatement = problem.vProblemStatement;
};

// POST 

Problem.create = (newproblem, result) => {
    sql.query("INSERT INTO ptoblemstatement SET ?", newproblem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ptoblemstatement: ", { pId: res.insertpId, ...newproblem });
        result(null, { pId: res.insertpId, ...newproblem });
    });
};

//GET All
Problem.getAll = (result) => {
    let query = "SELECT * FROM ptoblemstatement";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ptoblemstatement: ", res);
        result(null, res);
    });
};

// get by ID
Problem.findData = (pId, result) => {
    sql.query(`SELECT * FROM ptoblemstatement WHERE pId = ${pId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("ptoblemstatement: ", res);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


// delete problemStatement
Problem.remove = (pId, result) => {
    sql.query(`DELETE  FROM ptoblemstatement WHERE pId = ${pId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted ptoblemstatement with Id: ", pId);
        result(null, res);
    });
};

// update problem statement
Problem.update = (pId, statement, result) => {
    let query = `UPDATE ptoblemstatement SET hId = ?,theId = ?,vProblemStatement = ? WHERE pId = ${pId}`
    sql.query(query, [statement.hId,statement.theId,statement.vProblemStatement,pId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("ptoblemstatement update with Id: ", pId);
        result(null, res);
    });
};

module.exports = Problem;
