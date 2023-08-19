module.exports = app => {
    const type = require('../controller/type.controller');

    var router = require("express").Router();
  
    router.get("/", type.findAll);


    router.get("/Id/:iParentId", type.findId);


    router.get("/domain", type.findType);

    // insert
    router.post('',type.create)

    // update
    router.put('/:tId',type.update)

    // delete
    router.delete('/:tId', type.delete)
  
    app.use('/api/type', router);
};