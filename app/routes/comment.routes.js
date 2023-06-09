const verifyToken = require('../controller/jwt')

module.exports = app => {
    const contact = require('../controller/comment.controller');

    var router = require("express").Router();

    // Create a new contact
    router.post("/",verifyToken, contact.create);

    // Retrieve all contact
    router.get("/",verifyToken, contact.findAll);

    app.use('/app/comment', router);
};