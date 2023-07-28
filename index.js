const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const authMiddleware = require('./app/middleware/google.authentication')
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hackathon" });
});
app.use(authMiddleware)

// Generate JWT token
app.post("/token", (req, resp) => {
  const user = {};

  jwt.sign({ user }, secretKey, {}, (err, token) => {
    if (err) {
      resp.status(500).json({ error: "Failed to generate token" });
    } else {
      resp.json({ token });
    }
  });
});
app.use("/app/Images", express.static(path.join(__dirname, "app/Images")));

const hello = require("./app/middleware/jwt.middleware");
app.use(hello);

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

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
