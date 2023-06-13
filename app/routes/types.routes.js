const verifyToken = require('../controller/jwt')

module.exports = app => {
    const type = require('../controller/type.controller');

    var router = require("express").Router();
  
    router.get("/",verifyToken, type.findAll);


    router.get("/:iParentId",verifyToken, type.findId);

  
    app.use('/app/type', router);
};