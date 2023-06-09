const verifyToken = require('../controller/jwt')

module.exports = app => {
    const signin = require('../controller/login.controller');

    var router = require("express").Router();
  
    router.post("/login",verifyToken, signin.login);

  
    app.use('/app/registration', router);
};