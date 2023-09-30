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

// student registration
require('./app/routes/student.register.routes')(app)

//login
app.post('/api/login', (req, resp) => {
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
      const user = {};
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
                sucess: true,
                message: `Login Successfully`,
                details: resp1[0],
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
require('./app/routes/template.route')(app)
require('./app/routes/admin.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});