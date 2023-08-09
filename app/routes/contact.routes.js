module.exports = app => {
    const contact = require('../controller/contact.controller');

    var router = require("express").Router();

    // Create a new contact
    router.post("/", contact.create);

    // Retrieve all contact
    router.get("/", contact.findAll);

    app.use('/api/contact', router);
};