const sql = require('../config/db');
const nodemailer = require('nodemailer')
// constructor
const Registration = function (registration) {
  this.vName = registration.vName;
  this.vEmail = registration.vEmail;
  this.vMobileNumber = registration.vMobileNumber;
  this.vAddress = registration.vAddress;
  this.vQualification = registration.vQualification;
  this.vProfession = registration.vProfession;
  this.vTeamType = registration.vTeamType;
  this.iNumberOfMembers = registration.iNumberOfMembers;
  this.vProblemStatement = registration.vProblemStatement;
  this.Document = registration.Document;
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

      sql.query("INSERT INTO student SET ?", registration, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created registration: ", { Id: res.insertId, ...registration });
        result(null, { Id: res.insertId, ...registration });

        const transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user:'makwanatanmay483@gmail.com',
            pass:'dpougalojrojtnsh'
          }
        })

        var mailOption={
          from:'makwanatanmay483@gmail.com',
          to: vEmail,
          subject: 'HackaThon Registration',
          text: `Your registartion is scessfull here is your password for final conformation for entry your Password is:${password}
          Thank you for registartion`
        };

        transporter.sendMail(mailOption,(error,info)=>{
          if(error){
            console.log(error)
          }
          else{
            console.log("Email sent scessfully:"+info.response)
          }
        })

      });
    }
  });
}
function getPassword() {
  var length = 8,
    charset = "@#$%&*0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
          console.log("student details: ", res);
          result(null, res);
          return;
      }
      result({ kind: "not_found" }, null);
  });
};


module.exports = Registration