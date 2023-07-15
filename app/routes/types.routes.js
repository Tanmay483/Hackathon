module.exports = app => {
    const type = require('../controller/type.controller');

    var router = require("express").Router();
  
    router.get("/", type.findAll);


    router.get("/Id/:iParentId", type.findId);


    router.get("/domain", type.findType);

  
    app.use('/api/type', router);
};