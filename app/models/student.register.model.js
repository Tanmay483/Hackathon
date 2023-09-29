const sql = require('../config/db');
const sendmail = require('../middleware/newPassword.tamplate')
const jwt = require('jsonwebtoken')

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
  // this.sId = registration.sId
  // this.hId = registration.hId
  // this.iTeamId = registration.iTeamId
  // this.tId = registration.tId
  // this.domId = registration.domId
  // this.themeId = registration.themeId
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

      // token genrate
      const user = resEmail
      jwt.sign({ user }, process.env.JWT_SECRET_KEY, {}, (err, token) => {
        if(err){
          result("Error:" + err.message)
        }
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
          YearofGraduation: registration.YearofGraduation,
          jwtToken: token
        };

        // Insert student record into the database
        sql.query("INSERT INTO student SET ?", student, (errInsert, resInsert) => {
          if (errInsert) {
            console.log("error: ", errInsert);
            result(errInsert, null);
            return;
          }

          console.log("created registration: ", { Id: resInsert.insertId, ...registration });
          result(null, { Id: resInsert.insertId, ...student  });

          // Apply to hackathon
          // if (registration.vTeamType == "team" || registration.vTeamType == "individual") {
          //   const apply = {
          //     sId: resInsert.insertId,
          //     hId: registration.hId,
          //     iTeamId: registration.iTeamId,
          //     leader: 0,
          //     vtype: registration.vTeamType,
          //     tId: registration.tId,
          //     domId: registration.domId,
          //     themeId: registration.themeId
          //   };

          //   sql.query("INSERT INTO applytohackathon SET ?", apply, (errApply, resApply) => {
          //     if (errApply) {
          //       console.log("error: ", errApply);
          //       result(errApply, null);
          //       return;
          //     } else {
          //       console.log("applied to hackathon: ", resApply);
          //     }
          //   });
          // }

          // Sende mail
          sendmail(registration.vEmail, registration.password);
        });
      })
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


// get hackathon by ID
Registration.findById = (hId, result) => {
  sql.query(`SELECT * FROM hackathon WHERE hId = ${hId}`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if (res.length === 0) {
          console.log('data not found');
          result('error', null);
          return;
      }
      const hackathon = res[0];

      sql.query(
          `SELECT comId, Id, vcomment FROM comment WHERE hId = ${hId}`,
          (err, res) => {
              if (err) {
                  console.log('Error:', err);
                  result(err, null);
                  return;
              }

              const comment = res.length > 0 ? res : [];

              const resultData = {
                  hackathon: hackathon,
                  comment: comment,
                  tab: {
                      vBrif: hackathon.vBrif,
                      vDetails: hackathon.vDetails
                  }
              };

              console.log('found hackathon:', resultData);
              result(null, resultData);
          }
      );
  });
};




module.exports = Registration