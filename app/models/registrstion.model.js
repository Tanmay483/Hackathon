const { composer } = require('googleapis/build/src/apis/composer');
const sql = require('../config/db');
const sendmail = require('../middleware/newPassword.tamplate')


// constructor
const Registration = function (registration) {
  this.vName = registration.vName;
  this.vUserName = registration.vUserName;
  this.vEmail = registration.vEmail;
  this.vMobileNumber = registration.vMobileNumber;
  this.vGitUrl = registration.vGitUrl;
  this.vAddress = registration.vAddress;
  this.country = registration.country
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
  this.domainId = registration.domainId
  this.courseId = registration.courseId
  this.CourseProgramme = registration.CourseProgramme
  this.YearofGraduation = registration.YearofGraduation
  this.search = registration.search
};
Registration.create = (registration, result) => {
  const { vEmail, vUserName } = registration;

  // Check if vUserName is already in use
  sql.query(`SELECT * FROM student WHERE vUserName = '${vUserName}'`, (errUserName, resUserName) => {
    if (errUserName) {
      console.log("error: ", errUserName);
      result(errUserName, null);
      return;
    }

    if (resUserName.length > 0) {
      console.log("Username is already in use");
      result("Username is already in use", null);
      return;
    }

    // Check if vEmail is already in use
    sql.query(`SELECT * FROM student WHERE vEmail = '${vEmail}'`, (errEmail, resEmail) => {
      if (errEmail) {
        console.log("error: ", errEmail);
        result(errEmail, null);
        return;
      }

      if (resEmail.length > 0) {
        console.log("Email is already in use");
        result("Email is already in use", null);
        return;
      }

      // Generate password
      var password = getPassword();
      console.log("Generated password: ", password);

      registration.password = password;

      const student = {
        vName: registration.vName,
        vUserName: registration.vUserName,
        vEmail: registration.vEmail,
        vMobileNumber: registration.vMobileNumber,
        vGitUrl: registration.vGitUrl,
        vAddress: registration.vAddress,
        country: registration.country,
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
        password: password,
        domainId: registration.domainId,
        courseId: registration.courseId,
        CourseProgramme: registration.CourseProgramme,
        YearofGraduation: registration.YearofGraduation
      };

      // Insert student record into the database
      sql.query("INSERT INTO student SET ?", student, (errInsert, resInsert) => {
        if (errInsert) {
          console.log("error: ", errInsert);
          result(errInsert, null);
          return;
        }

        console.log("created registration: ", { Id: resInsert.insertId, ...registration });
        result(null, { Id: resInsert.insertId, ...registration });

        // Apply to hackathon
        if (registration.vTeamType == "team" || registration.vTeamType == "individual") {
          const apply = {
            sId: resInsert.insertId,
            hId: registration.hId,
            iTeamId: registration.iTeamId,
            leader: 0,
            vtype: registration.vTeamType,
            tId: registration.tId,
            domId: registration.domId,
            themeId: registration.themeId
          };

          sql.query("INSERT INTO applytohackathon SET ?", apply, (errApply, resApply) => {
            if (errApply) {
              console.log("error: ", errApply);
              result(errApply, null);
              return;
            } else {
              console.log("applied to hackathon: ", resApply);
            }
          });
        }

        // Send email
        sendmail(registration.vEmail, registration.password);
      });
    });
  });
};
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
    if (result1.length == 0) {
      return res.status(404).json({ error: `data not found with Id ${Id}` });
    }
    else {

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
    }
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
  let query1 = `UPDATE student SET vMobileNumber=?, vGitUrl=?, vAddress=?, country=?,vQualification=?, vProfession=?, vTeamType=?, iNumberOfMembers=?, vProblemStatement=?, keyStatus=?, vUniversity=?,gender=?,Termsandcondition=?,subscibe=?,domainId=?,courseId=?,CourseProgramme=?,YearofGraduation=?`
  const queryParams = [
    registration.vMobileNumber,
    registration.vGitUrl,
    registration.vAddress,
    registration.country,
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
    registration.domainId,
    registration.courseId,
    registration.CourseProgramme,
    registration.YearofGraduation
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

  // update applytohackathon
  let query2 = "UPDATE applytohackathon SET ";
  const queryParams2 = [];

  // Additional fields in applytohackathon, similar to above
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

  // Execute the queries
  sql.query(query1, queryParams, (err, res) => {
    if (err) {
      console.error("Error updating data in student table:", err);
      result(err, null);
    } else {
      if (queryParams2.length > 0) {
        sql.query(query2, queryParams2, (err, res) => {
          if (err) {
            console.error("Error updating data in applytohackathon table:", err);
          }
          result(null, "Data updated successfully");
        });
      } else {
        console.log("Data updated successfully in student table");
        result(null, "Data updated successfully");
      }
    }
  });
};

// find hackathon
Registration.hackathon = (Id, res) => {
  let query1 = `SELECT * FROM student INNER JOIN applytohackathon ON student.Id = applytohackathon.sId WHERE student.Id = ${Id};`;

  sql.query(query1, (err, result1) => {
    if (err) {
      console.error('Error executing query1:', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    if (result1.length === 0) {
      return res.status(404).json({ error: `Data not found with Id ${Id}` });
    } else {
      const hackathonList = [];
      let hackathonProcessed = 0;

      for (let i = 0; i < result1.length; i++) {
        const hId = result1[i].hId;
        let query2 = `SELECT hId, vTitle, vDetails, vDeadline FROM hackathon WHERE hId = ${hId}`;

        const iTeamId = result1[i].iTeamId;
        const query3 = `SELECT * FROM applytohackathon WHERE iTeamId = '${iTeamId}'`;

        sql.query(query2, (err, result2) => {
          if (err) {  
            console.error('Error executing query2:', err);
            return res.status(500).json({ error: 'Something went wrong' });
          }

          sql.query(query3, (err, result3) => {
            if (err) {
              console.error('Error executing query3:', err);
              return res.status(500).json({ error: 'Something went wrong' });
            }

            // Retrieve student information based on sId from result3
            const sIds = result3.map((item) => item.sId).join(',');
            const leaderArray = result3.map((item) => item.leader.split(','));

            let query4 = `SELECT Id, vName , vEmail , vMobileNumber  FROM student WHERE Id IN (${sIds})`;

            sql.query(query4, (err, result4) => {
              if (err) {
                console.error('Error executing query4:', err);
                return res.status(500).json({ error: 'Something went wrong' });
              }

              const studentsWithLeader = result4.map((student, index) => ({
                ...student,
                Leader: leaderArray[index][0]
              }));

              // const teamDetails = {
              //   Students: studentsWithLeader
              // };

              const hackathonResult = {
                hId: result2[0].hId,
                vTitle: result2[0].vTitle,
                vDetails: result2[0].vDetails,
                vDeadline: result2[0].vDeadline,
                Students: studentsWithLeader
              };

              hackathonList.push(hackathonResult);

              hackathonProcessed++;

              if (hackathonProcessed === result1.length) {
                res.json(hackathonList);
              }
            });
          });
        });
      }
    }
  });
};



//serch
Registration.search = (search, result) => {
  sql.query(`SELECT * FROM student WHERE vName LIKE '%${search}%' OR vUserName LIKE '%${search}%' OR vEmail LIKE '%${search}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("result: ", res);
      result(null, res);
    } else {
      result("Result not found", null);
    }
  });
};


module.exports = Registration