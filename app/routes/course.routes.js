module.exports = app => {
    const course = require('../controller/course.controller');

    var router = require("express").Router();

    // Create a new course
    router.post("/", course.create);

    // Retrieve all course
    router.get("/all", course.findAll);

    //retrieve problemstatement by id
    router.get("/Id/:courseId", course.findId)

    //update problem statement
    router.put('/update/:courseId',course.Update)

    //delete tab
    router.delete('/delete/:courseId' , course.delete)

    //get domain and course
    router.get('/domain/:tId' , course.domain)

    app.use('/api/course', router);
};