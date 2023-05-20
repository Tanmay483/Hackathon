const express = require("express");
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hackathon" });
});
require('./app/routes/registration.routes')(app)
// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});