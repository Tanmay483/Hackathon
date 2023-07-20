const conn = require('../config/db');
module.exports = app => {
    const problemStatement = require('../controller/problemStatement.controller');

    var router = require("express").Router();

    // Create a new problemStatement
    router.post("/", problemStatement.create);

    // Retrieve all problemStatement
    router.get("/", problemStatement.findAll);

    //retrieve problemstatement by id
    router.get("/:pId", problemStatement.findId)

    //update problem statement
    router.put('/update/:pId',problemStatement.update )
    
    //delete problemstatement
    router.delete('/delete/:pId' , problemStatement.delete)

    app.use('/api/problemStatement', router);
};