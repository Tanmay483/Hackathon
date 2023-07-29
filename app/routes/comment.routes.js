module.exports = app => {
    const contact = require('../controller/comment.controller');

    var router = require("express").Router();

    // Create a new contact
    router.post("/", contact.create);

    // Retrieve all contact
    router.get("/", contact.findAll);

    app.use('/api/comment', router);
};