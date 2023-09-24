const multer = require('../documentController/document.control');

module.exports = (app) => {
    const registration = require('../controller/student.register.controller');
    var router = require('express').Router();

    // Create a new blog
    router.post('/registration/student', multer, registration.create);

    // 
    router.get('/hackathon/Id/:hId', registration.findOne)
    app.use('/api', router);
};
