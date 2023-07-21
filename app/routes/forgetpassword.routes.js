module.exports = app => {
    const password = require('../controller/forgetpassword.controller');

    var router = require("express").Router();
  
    router.post("/", password.newpassword);

  
    app.use('/api/forgetpassword', router);
};