const sql = require('../config/db');

// constructor
const Registration = function (registration) {

    this.vName = registration.vName;
    this.vEmail	 = registration.vEmail	;
    this.vMobileNumber = registration.vMobileNumber;
    this.vAddress = registration.vAddress;
    this.vQualification = registration.vQualification;
    this.vProfession = registration.vProfession;
    this.vTeamType = registration.vTeamType;
    this.iNumberOfMembers = registration.iNumberOfMembers;
    this.vProblemStatement = registration.vProblemStatement;
    this.Document = registration.Document;
};

// POST 

Registration.create = (registration, result) => {
    const { vEmail } = registration;

    sql.query(`SELECT * FROM student WHERE vEmail = '${vEmail}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length > 0) {
            console.log("Email is already in use");
            result("Email is already in use", null);
        } 
        else {
            sql.query("INSERT INTO student SET ?", registration, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created registration: ", { Id: res.insertId, ...registration });
                result(null, { Id: res.insertId, ...registration });
            });
        }
    });
};



//GET blog by id 

Registration.findId = (Id, result) => {
    sql.query(`SELECT * FROM student WHERE Id = ${Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("student details: ", res);
            result(null, res);
            return;
        }
        // result({ kind: "not_found" }, null);
    });
};

// GET all

Registration.getAll = (result) => {
    let query = "SELECT * FROM student";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Students: ", res);
        result(null, res);
    });
};

//PUT

Registration.updateById = (Id, registration, result) => {
    sql.query(
        "UPDATE student SET vName=?,vEmail=?,vMobileNumber=?,vAddress=?,vQualification=?,vProfession=?,vTeamType=?,iNumberOfMembers=?,vProblemStatement = ?, Document=? WHERE Id=?",
        [registration.vName, registration.vEmail, registration.vMobileNumber,registration.vAddress, registration.vQualification,registration.vProfession,registration.vTeamType,registration.iNumberOfMembers, registration.vProblemStatement, registration.Document, Id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated details: ", { Id: Id, ...registration });
            result(null, { Id: Id, ...registration });
        }
    );
};

// DELET

Registration.remove = (Id, result) => {
    sql.query("DELETE  FROM student WHERE Id = '"+Id+"'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return; 
        }
        console.log("detail delete with Id: ", Id);
        result(null, res);
    });
};
module.exports = Registration;