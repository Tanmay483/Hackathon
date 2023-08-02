const sql = require('../config/db');
// const nodemailer = require('nodemailer')
const sendmail = require('../middleware/newPassword.tamplate')


// constructor
const Registration = function (registration) {
  this.vName = registration.vName;
  this.vEmail = registration.vEmail;
  this.vMobileNumber = registration.vMobileNumber;
  this.vGitUrl = registration.vGitUrl;
  this.vAddress = registration.vAddress;
  this.vQualification = registration.vQualification;
  this.vProfession = registration.vProfession;
  this.vTeamType = registration.vTeamType;
  this.iNumberOfMembers = registration.iNumberOfMembers;
  this.vProblemStatement = registration.vProblemStatement;
  this.Document = registration.Document;
  this.keyStatus = registration.keyStatus
  this.iRanking = registration.iRanking
  this.vUniversity = registration.vUniversity
  this.gender = registration.gender
  this.Termsandcondition = registration.Termsandcondition
  this.subscibe = registration.subscibe
  this.sId = registration.sId
  this.hId = registration.hId
  this.iTeamId = registration.iTeamId

};
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
    } else {
      // Generate password
      var password = getPassword();
      console.log("Generated password: ", password);

      registration.password = password;

      const student = {
        vName: registration.vName,
        vEmail: registration.vEmail,
        vMobileNumber: registration.vMobileNumber,
        vGitUrl: registration.vGitUrl,
        vAddress: registration.vAddress,
        vQualification: registration.vQualification,
        vProfession: registration.vProfession,
        vTeamType: registration.vTeamType,
        iNumberOfMembers: registration.iNumberOfMembers,
        vProblemStatement: registration.vProblemStatement,
        Document: registration.Document,
        keyStatus: registration.keyStatus,
        iRanking: registration.iRanking,
        vUniversity: registration.vUniversity,
        gender: registration.gender,
        Termsandcondition: registration.Termsandcondition,
        subscibe: registration.subscibe,
        password: password
      }


      sql.query("INSERT INTO student SET ?", student, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created registration: ", { Id: res.insertId, ...registration });
        result(null, { Id: res.insertId, ...registration });

        // apply to hackathon 
        if (registration.vTeamType === "team") {

          const apply = {
            sId: res.insertId,
            hId: registration.hId,
            iTeamId: registration.iTeamId,
            leader: 0,
            Type: "team"
          }

          sql.query("INSERT INTO applytohackathon SET ?", apply, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            } else {
              console.log("applied to hackathon: ", res);
            }
          });

        }
        // send mail
        sendmail(registration.vEmail, registration.password);
      });
    }
  });
}
function getPassword() {
  var length = 8,
    charset = "!@#$%&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    password = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

// get all details
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


//GET blog by id 

Registration.findId = (Id, result) => {
  sql.query(`SELECT * FROM student WHERE Id = ${Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("student details: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

//update status 

Registration.status = (Id, status, result) => {
  let query = `UPDATE student SET keyStatus =? WHERE Id = ?`

  sql.query(query, [status.keyStatus, Id], (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Database update failed"
      });
    } else {
      console.log("status change successfully");
      result(null, "Status change successfully")
    }

  });
}

// update rankigs
Registration.ranking = (Id, ranking, result) => {
  let query = `UPDATE student SET iRanking =? WHERE Id = ?`

  sql.query(query, [ranking.iRanking, Id], (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Database update failed"
      });
    } else {
      console.log("Ranking change successfully");
      result(null, "Ranking change successfully")
    }

  });
}

// update giturl
Registration.giturl = (Id, url, result) => {
  let query = `UPDATE student SET vGitUrl =? WHERE Id = ?`

  sql.query(query, [url.vGitUrl, Id], (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Database update failed"
      });
    } else {
      console.log("GitUrl change successfully");
      result(null, "GitUrl change successfully")
    }

  });
}

// update data
Registration.update = (Id, registration, result) => {
  let query =
    "UPDATE student SET vMobileNumber=?, vGitUrl=?, vAddress=?, vQualification=?, vProfession=?, vTeamType=?, iNumberOfMembers=?, vProblemStatement=?, keyStatus=?, vUniversity=?,gender=?,Termsandcondition=?,subscibe=?";
  const queryParams = [
    registration.vMobileNumber,
    registration.vGitUrl,
    registration.vAddress,
    registration.vQualification,
    registration.vProfession,
    registration.vTeamType,
    registration.iNumberOfMembers,
    registration.vProblemStatement,
    registration.keyStatus,
    registration.vUniversity,
    registration.gender,
    registration.Termsandcondition,
    registration.subscibe,
  ];

  if (registration.vName) {
    query += ", vName=?";
    queryParams.push(registration.vName);
  }
  if (registration.Document) {
    query += ", Document=?";
    queryParams.push(registration.Document);
  }

  query += " WHERE Id = ?";
  queryParams.push(Id);

  sql.query(query, queryParams, (err, res) => {
    if (err) {
      console.error("Error updating data:", err);
      result(err, null);
    } else {
      console.log("Data Updated Successfully", { Id: Id, registration });
      result(null, "Data Updated Successfully", { Id: Id, registration });
    }
  });
};

module.exports = Registration