const multer = require('../documentController/document.control');

module.exports = (app) => {
    const registration = require('../controller/student.register.controller');
    var router = require('express').Router();

    // Create a new blog
    router.post('/student', multer, registration.create);

    app.use('/api/registration', router);
};
