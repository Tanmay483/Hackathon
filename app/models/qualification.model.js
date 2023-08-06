const sql = require('../config/db');

// constructor
const Qualification = function (qualification) {
    this.vqualification = qualification.vqualification;
};

// POST 

Qualification.create = (qualification, result) => {
    sql.query("INSERT INTO qualification SET ?", qualification, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("qualification: ", { qId: res.insertqId, ...qualification });
        result(null, { qId: res.insertId, ...qualification });
    });
};

//GET All

Qualification.getAll = (result) => {
    let query = "SELECT * FROM qualification";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("qualification: ", res);
        result(null, res);
    });
};

// get by ID
Qualification.findData = (qId, result) => {
    sql.query(`SELECT * FROM qualification WHERE qId = ${qId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("qualification: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


// delete problemStatement

Qualification.remove = (qId, result) => {
    sql.query(`DELETE  FROM qualification WHERE qId = ${qId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted qualification with Id: ", qId);
        result(null, res);
    });
};

// update tab
Qualification.Update = (qId, qualification, result) => {
    let query = `UPDATE qualification SET vqualification =? WHERE qId = ?`

    sql.query(query, [qualification.vqualification,qId], (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database update failed"
            });
        } else {
            console.log("Qualification update successfully");
            result(null, "Qualification update successfully")
        }

    });
}
module.exports = Qualification;