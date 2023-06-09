const Signin = require('../models/login.model')

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  // Create a Registration object
  const login = new Signin({
    vEmail: req.body.vEmail,
    Password: req.body.Password,
  });

  // Call the login method on the Registration model
  Signin.login(login.vEmail, login.Password, (err, data) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: "login failed " + " Invalid Username or Password"
      });
    } else {
      console.log("login scessfull");
      console.log(req.body);
      res.status(200).json({
        success: true,
        // data: req.body,
        message: "login scessfull"
      });
    }
  });
};
