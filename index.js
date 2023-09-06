const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authMiddleware = require('./app/middleware/google.authentication')
const app = express();
const env = require('dotenv');
const sql = require('./app/config/db');

env.config();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// fetch image
app.use("/app/Images", express.static(path.join(__dirname, "app/Images")));
app.use("/app/adImage", express.static(path.join(__dirname, "app/adImage")));
app.use("/app/sponserImage", express.static(path.join(__dirname, "app/sponserImage")));
//fetch documente
app.use("/app/Documents", express.static(path.join(__dirname, "app/Documents")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hackathon" });
});
app.use(authMiddleware)

require('./app/routes/student.register.routes')(app)

//login
app.post('/login', (req, resp) => {
  const vUserName = req.body.username;
  const Password = req.body.password;
  let query1 = `SELECT * FROM student WHERE vUserName = '${vUserName}' AND Password = '${Password}'`;
  
  sql.query(query1, (err, resp1) => {
    if (err) {
      resp.status(500).json({
        message: err.message
      });
    } else if (resp1.length === 0) {
      resp.status(404).json({
        message: `Invalid Username or Password`
      });
    } else {
      const user = resp1;
      jwt.sign({ user }, process.env.JWT_SECRET_KEY, {}, (err, token) => {
        if (err) {
          resp.status(500).json({ error: "Failed to generate token" });
        } else {
          const sId = resp1[0].Id;
          const query2 = `UPDATE student SET jwtToken = '${token}' WHERE Id = ${sId}`;
          
          sql.query(query2, (err, resp2) => {
            if (err) {
              resp.status(500).json({
                message: err.message
              });
              console.log(err)
            } else {
              resp.status(200).json({
                message: `Login Successfully`,
                Token: token
              });
            }
          });
        }
      });
    }
  });
});


const stripe = require('./app/middleware/stripe.payment.checkout')
app.use(stripe)


const hello = require("./app/middleware/jwt.middleware");
app.use(hello);


// logout
app.post('/logout', (req, res) => {
  const header = req.headers['authorization'].split(" ");
  const token = header[1]
  let query = `UPDATE student SET jwtToken = ' ' WHERE jwtToken = '${token}' `
  sql.query(query, (err, resp) => {
    if (err) {
      throw err
    }
    else {
      res.status(200).json({
        message: `Logout successful`
      })
    }
  })
})

require("./app/routes/registration.routes")(app);
require("./app/routes/details.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/types.routes")(app);
require("./app/routes/problemStatement.routes")(app);
require("./app/routes/theme.routes")(app);
require("./app/routes/tab.routes")(app);
require("./app/routes/portfolio.routes")(app);
require("./app/routes/forgetpassword.routes")(app);
require("./app/routes/categories.routes")(app);
require("./app/routes/team.routes")(app);
require("./app/routes/applyToHackathon.routes")(app);
require('./app/routes/qualification.routes')(app);
require('./app/routes/image.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/ads.routes')(app);
require('./app/routes/sponser.routes')(app);
require('./app/routes/package.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6MSwidk5hbWUiOiJUYW5tYXkgTWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyIiwidkVtYWlsIjoibWFrd2FuYXRhbm1heTQ4QGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiMTIzNjU0ODI2NSIsInZHaXRVcmwiOiIiLCJ2QWRkcmVzcyI6InN1cmF0IiwiY291bnRyeSI6IiIsInZRdWFsaWZpY2F0aW9uIjowLCJ2UHJvZmVzc2lvbiI6IlByb2plY3QgTWFuYWdlbWVudCAiLCJ2VGVhbVR5cGUiOiJpbmRpdmlkdWFsIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJZZXNzIiwiRG9jdW1lbnQiOiJkb2NzLTE2OTE3NTY4NzkwNDcucGRmIiwiUGFzc3dvcmQiOiJ2NFZOQ1Z1cSIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6IkdNSVUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIiLCJzdWJzY2liZSI6IiIsImlUZWFtSWQiOiIwIiwiZG9tYWluSWQiOjAsImNvdXJzZUlkIjowLCJDb3Vyc2VQcm9ncmFtbWUiOiIiLCJZZWFyb2ZHcmFkdWF0aW9uIjowLCJqd3RUb2tlbiI6IiJ9XSwiaWF0IjoxNjkzOTcyOTA5fQ._t-DDUQdBIi8OiZcjxsBPsQHp40NnzKJKODE7_fds-s
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6MSwidk5hbWUiOiJUYW5tYXkgTWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyIiwidkVtYWlsIjoibWFrd2FuYXRhbm1heTQ4QGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiMTIzNjU0ODI2NSIsInZHaXRVcmwiOiIiLCJ2QWRkcmVzcyI6InN1cmF0IiwiY291bnRyeSI6IiIsInZRdWFsaWZpY2F0aW9uIjowLCJ2UHJvZmVzc2lvbiI6IlByb2plY3QgTWFuYWdlbWVudCAiLCJ2VGVhbVR5cGUiOiJpbmRpdmlkdWFsIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJZZXNzIiwiRG9jdW1lbnQiOiJkb2NzLTE2OTE3NTY4NzkwNDcucGRmIiwiUGFzc3dvcmQiOiJ2NFZOQ1Z1cSIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6IkdNSVUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIiLCJzdWJzY2liZSI6IiIsImlUZWFtSWQiOiIwIiwiZG9tYWluSWQiOjAsImNvdXJzZUlkIjowLCJDb3Vyc2VQcm9ncmFtbWUiOiIiLCJZZWFyb2ZHcmFkdWF0aW9uIjowLCJqd3RUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcGJleUpKWkNJNk1Td2lkazVoYldVaU9pSlVZVzV0WVhrZ1RXRnJkMkZ1WVNJc0luWlZjMlZ5VG1GdFpTSTZJblJoYm0xaGVURXlJaXdpZGtWdFlXbHNJam9pYldGcmQyRnVZWFJoYm0xaGVUUTRRR2R0WVdsc0xtTnZiU0lzSWxSNWNHVWlPaUp1YjNKdFlXd2lMQ0oyVFc5aWFXeGxUblZ0WW1WeUlqb2lNVEl6TmpVME9ESTJOU0lzSW5aSGFYUlZjbXdpT2lJaUxDSjJRV1JrY21WemN5STZJbk4xY21GMElpd2lZMjkxYm5SeWVTSTZJaUlzSW5aUmRXRnNhV1pwWTJGMGFXOXVJam93TENKMlVISnZabVZ6YzJsdmJpSTZJbEJ5YjJwbFkzUWdUV0Z1WVdkbGJXVnVkQ0FpTENKMlZHVmhiVlI1Y0dVaU9pSnBibVJwZG1sa2RXRnNJaXdpYVU1MWJXSmxjazltVFdWdFltVnljeUk2TUN3aWRsQnliMkpzWlcxVGRHRjBaVzFsYm5RaU9pSlpaWE56SWl3aVJHOWpkVzFsYm5RaU9pSmtiMk56TFRFMk9URTNOVFk0Tnprd05EY3VjR1JtSWl3aVVHRnpjM2R2Y21RaU9pSjJORlpPUTFaMWNTSXNJbXRsZVZOMFlYUjFjeUk2SW1GamRHbDJaU0lzSW1sU1lXNXJhVzVuSWpveUxDSjJWVzVwZG1WeWMybDBlU0k2SWtkTlNWVWlMQ0puWlc1a1pYSWlPaUp0WVd4bElpd2lWRzlyWlc0aU9pSWlMQ0puWDBsa0lqb2lJaXdpVkdWeWJYTmhibVJqYjI1a2FYUnBiMjRpT2lJaUxDSnpkV0p6WTJsaVpTSTZJaUlzSW1sVVpXRnRTV1FpT2lJd0lpd2laRzl0WVdsdVNXUWlPakFzSW1OdmRYSnpaVWxrSWpvd0xDSkRiM1Z5YzJWUWNtOW5jbUZ0YldVaU9pSWlMQ0paWldGeWIyWkhjbUZrZFdGMGFXOXVJam93TENKcWQzUlViMnRsYmlJNklpSjlYU3dpYVdGMElqb3hOamt6T1RjeU9UQTVmUS5fdC1ERFVRZEJJaThPaVpjanhzQlBzUUhwNDBObnpLSktPREU3X2Zkcy1zIn1dLCJpYXQiOjE2OTM5NzI5Njd9.zttVYwSHH8AwjO0QikuMmyKR01neAC9w6inG8gV98ss
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6MSwidk5hbWUiOiJUYW5tYXkgTWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyIiwidkVtYWlsIjoibWFrd2FuYXRhbm1heTQ4QGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiMTIzNjU0ODI2NSIsInZHaXRVcmwiOiIiLCJ2QWRkcmVzcyI6InN1cmF0IiwiY291bnRyeSI6IiIsInZRdWFsaWZpY2F0aW9uIjowLCJ2UHJvZmVzc2lvbiI6IlByb2plY3QgTWFuYWdlbWVudCAiLCJ2VGVhbVR5cGUiOiJpbmRpdmlkdWFsIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJZZXNzIiwiRG9jdW1lbnQiOiJkb2NzLTE2OTE3NTY4NzkwNDcucGRmIiwiUGFzc3dvcmQiOiJ2NFZOQ1Z1cSIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6IkdNSVUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIiLCJzdWJzY2liZSI6IiIsImlUZWFtSWQiOiIwIiwiZG9tYWluSWQiOjAsImNvdXJzZUlkIjowLCJDb3Vyc2VQcm9ncmFtbWUiOiIiLCJZZWFyb2ZHcmFkdWF0aW9uIjowLCJqd3RUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcGJleUpKWkNJNk1Td2lkazVoYldVaU9pSlVZVzV0WVhrZ1RXRnJkMkZ1WVNJc0luWlZjMlZ5VG1GdFpTSTZJblJoYm0xaGVURXl


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6MSwidk5hbWUiOiJUYW5tYXkgTWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyIiwidkVtYWlsIjoibWFrd2FuYXRhbm1heTQ4QGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiMTIzNjU0ODI2NSIsInZHaXRVcmwiOiIiLCJ2QWRkcmVzcyI6InN1cmF0IiwiY291bnRyeSI6IiIsInZRdWFsaWZpY2F0aW9uIjowLCJ2UHJvZmVzc2lvbiI6IlByb2plY3QgTWFuYWdlbWVudCAiLCJ2VGVhbVR5cGUiOiJpbmRpdmlkdWFsIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJZZXNzIiwiRG9jdW1lbnQiOiJkb2NzLTE2OTE3NTY4NzkwNDcucGRmIiwiUGFzc3dvcmQiOiJ2NFZOQ1Z1cSIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6IkdNSVUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIiLCJzdWJzY2liZSI6IiIsImlUZWFtSWQiOiIwIiwiZG9tYWluSWQiOjAsImNvdXJzZUlkIjowLCJDb3Vyc2VQcm9ncmFtbWUiOiIiLCJZZWFyb2ZHcmFkdWF0aW9uIjowLCJqd3RUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcGJleUpKWkNJNk1Td2lkazVoYldVaU9pSlVZVzV0WVhrZ1RXRnJkMkZ1WVNJc0luWlZjMlZ5VG1GdFpTSTZJblJoYm0xaGVURXlJaXdpZGtWdFlXbHNJam9pYldGcmQyRnVZWFJoYm0xaGVUUTRRR2R0WVdsc0xtTnZiU0lzSWxSNWNHVWlPaUp1YjNKdFlXd2lMQ0oyVFc5aWFXeGxUblZ0WW1WeUlqb2lNVEl6TmpVME9ESTJOU0lzSW5aSGFYUlZjbXdpT2lJaUxDSjJRV1JrY21WemN5STZJbk4xY21GMElpd2lZMjkxYm5SeWVTSTZJaUlzSW5aUmRXRnNhV1pwWTJGMGFXOXVJam93TENKMlVISnZabVZ6YzJsdmJpSTZJbEJ5YjJwbFkzUWdUV0Z1WVdkbGJXVnVkQ0FpTENKMlZHVmhiVlI1Y0dVaU9pSnBibVJwZG1sa2RXRnNJaXdpYVU1MWJXSmxjazltVFdWdFltVnljeUk2TUN3aWRsQnliMkpzWlcxVGRHRjBaVzFsYm5RaU9pSlpaWE56SWl3aVJHOWpkVzFsYm5RaU9pSmtiMk56TFRFMk9URTNOVFk0Tnprd05EY3VjR1JtSWl3aVVHRnpjM2R2Y21RaU9pSjJORlpPUTFaMWNTSXNJbXRsZVZOMFlYUjFjeUk2SW1GamRHbDJaU0lzSW1sU1lXNXJhVzVuSWpveUxDSjJWVzVwZG1WeWMybDBlU0k2SWtkTlNWVWlMQ0puWlc1a1pYSWlPaUp0WVd4bElpd2lWRzlyWlc0aU9pSWlMQ0puWDBsa0lqb2lJaXdpVkdWeWJYTmhibVJqYjI1a2FYUnBiMjRpT2lJaUxDSnpkV0p6WTJsaVpTSTZJaUlzSW1sVVpXRnRTV1FpT2lJd0lpd2laRzl0WVdsdVNXUWlPakFzSW1OdmRYSnpaVWxrSWpvd0xDSkRiM1Z5YzJWUWNtOW5jbUZ0YldVaU9pSWlMQ0paWldGeWIyWkhjbUZrZFdGMGFXOXVJam93TENKcWQzUlViMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTld
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6MSwidk5hbWUiOiJUYW5tYXkgTWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyIiwidkVtYWlsIjoibWFrd2FuYXRhbm1heTQ4QGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiMTIzNjU0ODI2NSIsInZHaXRVcmwiOiIiLCJ2QWRkcmVzcyI6InN1cmF0IiwiY291bnRyeSI6IiIsInZRdWFsaWZpY2F0aW9uIjowLCJ2UHJvZmVzc2lvbiI6IlByb2plY3QgTWFuYWdlbWVudCAiLCJ2VGVhbVR5cGUiOiJpbmRpdmlkdWFsIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJZZXNzIiwiRG9jdW1lbnQiOiJkb2NzLTE2OTE3NTY4NzkwNDcucGRmIiwiUGFzc3dvcmQiOiJ2NFZOQ1Z1cSIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6IkdNSVUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIiLCJzdWJzY2liZSI6IiIsImlUZWFtSWQiOiIwIiwiZG9tYWluSWQiOjAsImNvdXJzZUlkIjowLCJDb3Vyc2VQcm9ncmFtbWUiOiIiLCJZZWFyb2ZHcmFkdWF0aW9uIjowLCJqd3RUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcGJleUpKWkNJNk1Td2lkazVoYldVaU9pSlVZVzV0WVhrZ1RXRnJkMkZ1WVNJc0luWlZjMlZ5VG1GdFpTSTZJblJoYm0xaGVURXlJaXdpZGtWdFlXbHNJam9pYldGcmQyRnVZWFJoYm0xaGVUUTRRR2R0WVdsc0xtTnZiU0lzSWxSNWNHVWlPaUp1YjNKdFlXd2lMQ0oyVFc5aWFXeGxUblZ0WW1WeUlqb2lNVEl6TmpVME9ESTJOU0lzSW5aSGFYUlZjbXdpT2lJaUxDSjJRV1JrY21WemN5STZJbk4xY21GMElpd2lZMjkxYm5SeWVTSTZJaUlzSW5aUmRXRnNhV1pwWTJGMGFXOXVJam93TENKMlVISnZabVZ6YzJsdmJpSTZJbEJ5YjJwbFkzUWdUV0Z1WVdkbGJXVnVkQ0FpTENKMlZHVmhiVlI1Y0dVaU9pSnBibVJwZG1sa2RXRnNJaXdpYVU1MWJXSmxjazltVFdWdFltVnljeUk2TUN3aWRsQnliMkpzWlcxVGRHRjBaVzFsYm5RaU9pSlpaWE56SWl3aVJHOWpkVzFsYm5RaU9pSmtiMk56TFRFMk9URTNOVFk0Tnprd05EY3VjR1JtSWl3aVVHRnpjM2R2Y21RaU9pSjJORlpPUTFaMWNTSXNJbXRsZVZOMFlYUjFjeUk2SW1GamRHbDJaU0lzSW1sU1lXNXJhVzVuSWpveUxDSjJWVzVwZG1WeWMybDBlU0k2SWtkTlNWVWlMQ0puWlc1a1pYSWlPaUp0WVd4bElpd2lWRzlyWlc0aU9pSWlMQ0puWDBsa0lqb2lJaXdpVkdWeWJYTmhibVJqYjI1a2FYUnBiMjRpT2lJaUxDSnpkV0p6WTJsaVpTSTZJaUlzSW1sVVpXRnRTV1FpT2lJd0lpd2laRzl0WVdsdVNXUWlPakFzSW1OdmRYSnpaVWxrSWpvd0xDSkRiM1Z5YzJWUWNtOW5jbUZ0YldVaU9pSWlMQ0paWldGeWIyWkhjbUZrZFdGMGFXOXVJam93TENKcWQzUlViMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVW94WXpKV2VVbHFjR0psZVVwS1drTkpOazFUZDJsa2F6Vm9ZbGRWYVU5cFNsVlpWelYwV1ZocloxUlhSbkprTWtaMVdWTkpjMGx1V2xaak1sWjVWRzFHZEZwVFNUWkpibEpvWW0weGFHVlVSWGwifV0sImlhdCI6MTY5Mzk3MzA3NH0.7h07Ph93CgggooTzoEVE4xTXQNV1AvH85PTe61lbkA8