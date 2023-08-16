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
//fetch documente
app.use("/app/Documents", express.static(path.join(__dirname, "app/Documents")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hackathon" });
});
app.use(authMiddleware)

// Generate JWT token
app.post("/token", (req, resp) => {
  const user = {};

  jwt.sign({ user }, process.env.JWT_SECRET_KEY, {}, (err, token) => {
    if (err) {
      resp.status(500).json({ error: "Failed to generate token" });
    } else {
      resp.json({ token });
      let query = `UPDATE jwttoken SET Token = '${token}' WHERE Id = 1`
      sql.query(query, (err, token) => {
        if (err) {
          throw err;
        }
        else {
          console.log("database updated")
        }
      })
    }
  });
});



const hello = require("./app/middleware/jwt.middleware");
app.use(hello);

// logout

app.post('/logout', (req, res) => {
  let query = `UPDATE jwttoken SET Token = ' ' WHERE Id = 1`
  sql.query(query, (err, resp) => {
    if (err) {
      throw err
    }
    else {
      res.send("Logout successfully")
    }
  })
})

require("./app/routes/registration.routes")(app);
require("./app/routes/login.routes")(app);
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

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});