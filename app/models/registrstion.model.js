const sql = require('../config/db');
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
  this.tId = registration.tId
  this.domId = registration.domId
  this.themeId = registration.themeId

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
        if (registration.vTeamType == "team" || registration.vTeamType == "individual") {

          const apply = {
            sId: res.insertId,
            hId: registration.hId,
            iTeamId: registration.iTeamId,
            leader: 0,
            vtype: registration.vTeamType,
            tId: registration.tId,
            domId: registration.domId,
            themeId: registration.themeId
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


//GET by id 

Registration.findId = (Id, res) => {
  let query1 = `SELECT * FROM student INNER JOIN applytohackathon ON student.Id = applytohackathon.sId WHERE student.Id = ${Id};`

  sql.query(query1, (err, result1) => {
    if (err) {
      console.error('Error executing query1:', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    // query 2
    let hId = result1[0].hId
    let query2 = `SELECT * FROM hackathon WHERE hId = ${hId}`;
    sql.query(query2, (err, result2) => {
      if (err) {
        console.error('Error executing query2:', err);
        return res.status(500).json({ error: 'Something went wrong' });
      }

      // query 3
      let tId = result1[0].tId
      let query3 = `SELECT * FROM type WHERE tId = ${tId}`
      sql.query(query3, (err, result3) => {
        if (err) {
          console.error('Error executing query3:', err);
          return res.status(500).json({ error: 'Something went wrong' });
        }

        // query 4
        let domId = result1[0].domId
        let query4 = `SELECT * FROM type WHERE tId = ${domId}`
        sql.query(query4, (err, result4) => {
          if (err) {
            console.error('Error executing query4:', err);
            return res.status(500).json({ error: 'Something went wrong' });
          }

          // query 5

          let themeId = result1[0].themeId
          let query5 = `SELECT * FROM hackathontheme WHERE theId = ${themeId}`
          sql.query(query5, (err, result5) => {
            if (err) {
              console.error('Error executing query5:', err);
              return res.status(500).json({ error: 'Something went wrong' });
            }
            // query6
            let qId = result1[0].vQualification
            console.log(qId)
            let query6 = `SELECT * FROM  qualification WHERE qId = ${qId}`;
            sql.query(query6, (err, result6) => {
              if (err) {
                console.error('Error executing query6:', err);
                return res.status(500).json({ error: 'Something went wrong' });
              }
              const combinedResults = {
                student: result1[0],
                hackathon: result2[0],
                type: result3[0],
                domain: result4[0],
                theme: result5[0],
                qualification: result6[0],
              };
              res.json(combinedResults);
            })
          })
        })
      })
    })
  })
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
  let query1 =
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
    query1 += ", vName=?";
    queryParams.push(registration.vName);
  }
  if (registration.Document) {
    query1 += ", Document=?";
    queryParams.push(registration.Document);
  }

  query1 += " WHERE Id = ?";
  queryParams.push(Id);

  let query2 = "UPDATE applytohackathon SET ";
  const queryParams2 = [];

  if (registration.hId) {
    query2 += "hId=?, ";
    queryParams2.push(registration.hId);
  }
  if (registration.iTeamId) {
    query2 += "iTeamId=?, ";
    queryParams2.push(registration.iTeamId);
  }
  if (registration.tId) {
    query2 += "tId=?, ";
    queryParams2.push(registration.tId);
  }
  if (registration.domId) {
    query2 += "domId=?, ";
    queryParams2.push(registration.domId);
  }
  if (registration.themeId) {
    query2 += "themeId=?, ";
    queryParams2.push(registration.themeId);
  }

  // Remove the trailing comma and space if any fields were provided
  if (queryParams2.length > 0) {
    query2 = query2.slice(0, -2);
  }

  query2 += " WHERE sId = ?";
  queryParams2.push(Id);

  sql.query(query1, queryParams, (err, res) => {
    if (err) {
      console.error("Error updating data:", err);
      result(err, null);
    }
    sql.query(query2, queryParams2, (err, res) => {
      if (err) {
        console.error("Error updating data:", err);
      }
      else {
        console.log("Data updated successfully");
        result(null, "Data updated successfully")
      }
    })
  });
};

module.exports = Registration