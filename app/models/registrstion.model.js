const sql = require('../config/db');
const nodemailer = require('nodemailer')
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


        // send mail

        var transport = nodemailer.createTransport({
          mailer: 'smtp',
          host: "server116.web-hosting.com",
          port: 465,
          auth: {
            user: "info@infinitysoftech.co",
            pass: "?VlXMbhSU}r#"
          }
        });
        const Template =
          `<!DOCTYPE html>
        <html>
        <head>
          <title>template</title>
          <style>
         
          .logo{
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 315px;
            padding-top: 25px;
        }
        .img{
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 18px;
            width: 400px;
            height: 250px;
        }
        
        .text{
            font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 16px;
        }
        
        .footers{
            background-color:gray;
            margin-top: 50px;
            margin-left: 0px;
            margin-right: 0px;
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;
            
        }
        
        .bg{
            width: 500px;
            align-content: center;
            margin: auto;
            background-color: antiquewhite;
        }
        .social{
            text-align: center;
            width: auto;
        }
        
          
          .social ul {
            padding: 0%;
            justify-content: center;
          }
          
          .social li {
            margin: 0 10px;
          }
          
          .social img {
            height: 25px;
            width: 25px;
            margin-left: 15px;
            margin-right: 15px;
            text-align: center;
          }
          
        
        
          </style>
        </head>
        <body>
            <link rel="stylesheet" type="text/css" href="style.css">
            <div class="bg">
            
            <header>
            <img src="https://www.infinitysoftech.co/wp-content/uploads/2023/02/logo-black-text.png" alt="logo" class="logo">
          </header>
        
          <img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt="image" class="img">
        
        
          <div class="text">
            <h1>Registration Successful</h1>
                <p>Dear ${vEmail},
                Congratulations on your successful registration!
                Your generated password is: <b>${password}</b>
                
                Thank you for registering with us!
              </p>
          </div>
        
          
        <footer class="footers">
          <p>&copy; 2023 Infinity Softech. All rights reserved.</p>
          <div class="social">
            <ul>
              <a href="https://www.instagram.com"><img src="https://img.freepik.com/premium-vector/purple-gradiend-social-media-logo_197792-1883.jpg" alt="Instagram"></a>
              <a href="https://www.facebook.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook"></a>
              <a href="https://linkedin.com"><img src="https://www.freepnglogos.com/uploads/linkedin-in-logo-png-1.png" alt="LinkedIn"></a>
              <a href="https://twitter.com"><img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="Twitter"></a>
            </ul>
          </div>
        </footer>
        
        
          </footer>
        </div>
        </body>
        </html>
        `
        var mailOption = {
          from: 'info@infinitysoftech.co',
          to: vEmail,
          subject: 'Hackathon Registration',
          html: Template
        };

        transport.sendMail(mailOption, (error, info) => {
          if (error) {
            console.log(error)
          }
          else {
            console.log("Email sent scessfully:" + info.response)
          }
        })

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
    "UPDATE student SET vMobileNumber=?, vGitUrl=?, vAddress=?, vQualification=?, vProfession=?, vTeamType=?, iNumberOfMembers=?, vProblemStatement=?, keyStatus=?, vUniversity=?";
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