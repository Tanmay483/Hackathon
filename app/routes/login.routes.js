// const verifyToken = require('../controller/jwt')

module.exports = app => {
    const signin = require('../controller/login.controller');

    var router = require("express").Router();
  
    router.post("/login", signin.login);

  
    app.use('/api/registration', router);
};