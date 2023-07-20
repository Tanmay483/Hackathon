module.exports = app => {
    const portfolio = require('../controller/portfolio.controller');

    var router = require("express").Router();

    // Create a new portfolio
    router.post("/", portfolio.create);

    // Retrieve all portfolio
    router.get("/", portfolio.findAll);

    //retrieve problemstatement by id
    router.get("/:pId", portfolio.findId)

    //update problem statement
    router.put('/update/:pId',portfolio.Update)

    //delete tab
    router.delete('/delete/:pId' , portfolio.delete)

    app.use('/api/portfolio', router);
};