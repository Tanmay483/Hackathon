module.exports = app => {
    const Tab = require('../controller/tab.controller');

    var router = require("express").Router();

    // Create a new Tab
    router.post("/", Tab.create);

    // Retrieve all Tab
    router.get("/all", Tab.findAll);

    //retrieve problemstatement by id
    router.get("/Id/:tabId", Tab.findId)

    //update problem statement
    router.put('/update/:tabId',Tab.Update)

    //delete tab
    router.delete('/delete/:tabId' , Tab.delete)

    app.use('/api/tab', router);
};