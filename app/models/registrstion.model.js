const sql = require('../config/db');

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

      const query7 = `SELECT * FROM student WHERE Id = ${Id}`
      sql.query(query7, (err, result7) => {
        if (err) {

          return res.status(500).json({ error: 'Something went wrong' });

        } else {

          const response = {
            student: result7[0],
            hackathon: {},
            domain: {},
            theme: {},
            qualification: {},
          };
          res.json(response)
          return

        }
      });
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

// update status 
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
  let query1 = `SELECT * FROM applytohackathon WHERE sId = ${Id}`; // retrieve sId, hId, and all other id

  sql.query(query1, (err, result1) => {
    if (err) {
      res.send(err);
    } else {
      let a = result1.length;
      let hackathonResults = [];

      for (let i = 0; i < a; i++) {
        const hId = result1[i].hId;
        let query2 = `SELECT hId, vTitle, vDetails, vDeadline, vImage FROM hackathon WHERE hId = ${hId}`; // retrieve hackathon details
        sql.query(query2, (err, result2) => {
          if (err) {
            res.send(err);
          } else {
            const tId = result1[i].iTeamId;
            let query3 = `SELECT * FROM applytohackathon WHERE iTeamId = "${tId}" AND leader = 2`; // retrieve leader details
            sql.query(query3, (err, result3) => {
              if (err) {
                res.send(err);
              } else {
                const leaderId = result3[0].sId;
                let temId = result3[0].iTeamId;
                let query4 = `SELECT vTeamName FROM team WHERE iTeamId = '${temId}'`; // retrieve team name
                sql.query(query4, (err, result4) => {
                  if (err) {
                    res.send(err);
                  } else {
                    let query5 = `SELECT * FROM applytohackathon WHERE iTeamId = '${tId}'`; // retrieve sid of same team member
                    sql.query(query5, (err, result5) => {
                      if (err) {
                        res.send(err);
                      } else {
                        // Create an array to store the sId values
                        const result6Data = []; // Array to store result6 values
                        for (let j = 0; j < result5.length; j++) {
                          let sId = result5[j].sId;
                          let query6 = `SELECT Id, vName , vEmail,vMobileNumber FROM student WHERE Id = ${sId}`; // retrieve student information
                          sql.query(query6, (err, result6) => {
                            if (err) {
                              throw err;
                            } else {
                              // Determine the leader value based on matching leaderId
                              const leader = sId === leaderId ? 1 : 0;
                              
                              // Store result6 in the result6Data array with the leader field
                              result6Data.push({ ...result6[0], leader });

                              if (result6Data.length === result5.length) {
                                const teamInfo = {
                                  TeamName: result4[0].vTeamName,
                                  StudentDetail: result6Data,
                                };

                                // Add TeamInfo to the hackathonResults
                                result2[0].TeamInfo = teamInfo;

                                hackathonResults.push(result2[0]);

                                if (hackathonResults.length === a) {
                                  res.status(200).json({
                                    hackathon: hackathonResults,
                                  });
                                }
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                });
              }
            });
          }
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