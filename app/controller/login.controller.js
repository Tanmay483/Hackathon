const Signin = require('../models/login.model')

exports.login = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content cannot be empty!"
    });
    return;
  }
  const login = new Signin({
    vEmail: req.body.vEmail,
    Password: req.body.Password,
  });

  Signin.login(login.vEmail, login.Password, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "login failed " + " Invalid Username or Password"
      });
    } else {
      console.log("login scessfull");
      console.log(req.body);
      res.status(200).json({
        success: true,
        Id: data[0].Id,
        message: "login scessfull"

      });
    }
  });
};
