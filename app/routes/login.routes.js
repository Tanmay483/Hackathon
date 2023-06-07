const conn = require('../config/db')
const secretKey = require('../controller/jwt')
module.exports = app => {
    const signin = require('../controller/login.controller');

    var router = require("express").Router();
  
    router.post("/login",secretKey, signin.login);

  
    app.use('/app/registration', router);
};