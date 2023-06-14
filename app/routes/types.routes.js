const verifyToken = require('../controller/jwt')

module.exports = app => {
    const type = require('../controller/type.controller');

    var router = require("express").Router();
  
    router.get("/",verifyToken, type.findAll);


    router.get("/Id/:iParentId",verifyToken, type.findId);


    router.get("/domain",verifyToken, type.findType);

  
    app.use('/app/type', router);
};