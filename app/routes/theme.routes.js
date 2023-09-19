module.exports = app => {
    const Theme = require('../controller/theme.controller');

    var router = require("express").Router();

    // Create a new Theme
    router.post("/addTheme", Theme.create);

    // Retrieve all Theme
    router.get("/all", Theme.findAll);

    //retrieve problemstatement by id
    router.get("/:theId", Theme.findId)

    //update problem statement
    router.put('/update/:theId',Theme.Update)

    // delete
    router.delete('/delete/:theId',Theme.delete)

    // get theme by hId
    router.get('/hId/:hId', Theme.findById)

    app.use('/api/theme', router);
};