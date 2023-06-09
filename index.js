const express = require("express");
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secretKey = "secretKey"




const app = express();

app.use(cors());



app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hackathon" });
});


// Generate JWT token
app.post('/token', (req, resp) => {
  const user = {};

  jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
    if (err) {
      resp.status(500).json({ error: 'Failed to generate token' });
    } else {
      resp.json({ token });
    }
  });
});

app.use('/app/Images', express.static(path.join(__dirname, 'app/Images')));

require('./app/routes/registration.routes')(app)
require('./app/routes/login.routes')(app)
require('./app/routes/details.routes')(app)
require('./app/routes/contact.routes')(app)
require('./app/routes/comment.routes')(app)



// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});