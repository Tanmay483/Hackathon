module.exports = app => {
    const qualification = require('../controller/qualification.controller');

    var router = require("express").Router();

    // Create a new qualification
    router.post("/", qualification.create);

    // Retrieve all qualification
    router.get("/all", qualification.findAll);

    //retrieve qualification by id
    router.get("/Id/:qId", qualification.findId)

    //update qualification
    router.put('/update/:qId',qualification.Update)

    //delete qualification
    router.delete('/delete/:qId' , qualification.delete)

    app.use('/api/qualification', router);
};