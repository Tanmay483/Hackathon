const Course = require('../models/course.model');

// insert
exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content can not be empty!"
        });
    }
    const course = new Course({
        vName: req.body.vName,
        tId: req.body.tId,
    });

    //   POST

    Course.create(course, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "failed to generate course"
            });
        } else {
            console.log("course submited successfully");
            console.log(req.body);
            res.status(201).json({
                success: true,
                data: data,
                message: "course submited successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Course.getAll((err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "can not get course"
            });
        } else {
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Course"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Course.findData(req.params.courseId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Course with id " + req.params.courseId + " Id not found "
            });
        } else {
            console.log("course");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "course with id:" + req.params.courseId
            });
        }
    });
};

// delete tab

exports.delete = (req, res) => {
    Course.remove(req.params.courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found course with id ${req.params.courseId}.`
                });
            } else {
                res.send({
                    message: "Could not delete course with id " + req.params.courseId
                });
            }
        } else res.status(200).send({ message: `Course deleted successfully!` });
    });
};

// tab update
exports.Update = (req, res) => {
    if (!req.body) {
        res.send({ message: "please insert data" })
    }
    const update = new Course({
        vName: req.body.vName,
        tId: req.body.tId,
    });
    Course.Update(req.params.courseId, update, (err, data) => {
        if (err) {
            res.send({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Database update successfully"
            });
        }
    })
}

// get domain and course
exports.domain = (req, res) => {
    Course.domain(req.params.tId, res, (err, data) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: "error retriving data with id " + req.params.tId + " Id not found "
        });
      } else {
        console.log("Course:");
        console.log(req.body);
        res.status(200).json({
          success: true,
          data: data,
          message: "course with id:" + req.params.tId
        });
      }
    });
  };