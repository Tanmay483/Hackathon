const sql = require('../config/db');

const Signin = function (signin) {
  this.vUserName = signin.vUserName;
  this.Password = signin.Password
}

Signin.login = (vUserName, Password, result) => {
  sql.query(`SELECT * FROM student WHERE vUserName = '${vUserName}' AND Password = '${Password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Login successful");
      result(null, res);
    } else {
      console.log("Invalid username or Password");
      result("Invalid username or password", null);
    }
  });
};


module.exports = Signin;