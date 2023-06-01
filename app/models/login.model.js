const sql = require('../config/db');

const Signin = function(signin){
    this.vEmail = signin.vEmail;
    this.Password = signin.Password
  }

  Signin.login = (vEmail, Password, result) => {
    console.log(vEmail)
    console.log(Password)
    sql.query(`SELECT * FROM student WHERE vEmail = '${vEmail}' AND Password = '${Password}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Login successful");
        result(null, "Login successful");
      } else {
        console.log("Invalid email or Password");
        result("Invalid email or password", null);
      }
    });
  };
  
  
  module.exports = Signin;