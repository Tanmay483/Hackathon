const sql = require('../config/db');

const sendpassword = require('../middleware/forgetpassword.tamplate')
// genrate new password

function getPassword() {
  var length = 8,
    charset = "!@#$%&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    password = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const Forgetpassword = function (newpassword) {
  this.vEmail = newpassword.vEmail;
}

Forgetpassword.newpassword = (vEmail, result) => {
  console.log(vEmail)
  sql.query(`SELECT * FROM student WHERE vEmail = '${vEmail}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length == 0){
      result("plese enter valid email")
    }
    else {
      const vName = res[0].vName;
      const password = getPassword();
      console.log(password)

      sql.query(`UPDATE student SET Password = '${password}' WHERE vEmail = '${vEmail}'`, (error, resp) => {
        if (error) {
          console.log("Error updating password: ", error);
          result(error, null);
          return;
        }
        result(null, "New password send in your mail");
      })

      // send mail
      sendpassword(vEmail, password,vName)
    }

  });
}


module.exports = Forgetpassword;