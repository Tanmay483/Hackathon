// const verifyToken = require('../controller/jwt')
const conn = require('../config/db');
module.exports = app => {
    const Theme = require('../controller/theme.controller');

    var router = require("express").Router();

    // Create a new Theme
    router.post("/addTheme", Theme.create);

    // Retrieve all Theme
    router.get("/", Theme.findAll);

    //retrieve problemstatement by id
    router.get("/:theId", Theme.findId)

    //update problem statement
    router.put('/update/:theId',Theme.Update)

    app.use('/api/theme', router);
};