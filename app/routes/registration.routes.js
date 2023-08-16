const multer = require('../documentController/document.control');

module.exports = (app) => {
    const registration = require('../controller/registration.controller');
    var router = require('express').Router();

    // Create a new blog
    router.post('/', multer, registration.create);

    // Update a registration with id
    router.put('/:Id', registration.update);

    // Update a status with id
    router.put('/active/:Id', registration.status);

    // update git url
    router.put('/giturl/:Id', registration.giturl);

    // update ranking
    router.put('/ranking/:Id', registration.ranking);

    // Retrieve all registration
    router.get('/', registration.findAll);

    // Retrieve registration by id
    router.get('/Id/:Id', registration.findId);

    // get hackathon
    router.get('/hackathonlist/:Id', registration.hackathon)

    //search
    router.post('/search', registration.search)

    app.use('/api/registration', router);
};
