module.exports = app => {
    const type = require('../controller/type.controller');

    var router = require("express").Router();
  
    router.get("/", type.findAll);


    router.get("/Id/:tId", type.findId);


    router.get("/type", type.findType);

    // insert
    router.post('',type.create)

    // update
    router.put('/:tId',type.update)

    // delete
    router.delete('/:tId', type.delete)

    // get all domains
    router.get('/domains', type.findAllDomain)
  
    app.use('/api/type', router);
};