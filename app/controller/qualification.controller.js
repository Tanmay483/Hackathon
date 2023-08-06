const Qualification = require('../models/qualification.model');

// insert
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const qualification = new Qualification({
        vqualification: req.body.vqualification,
    });

    //   POST

    Qualification.create(qualification, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "failed to generate qualification"
            });
        } else {
            console.log("qualification submited successfully");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "qualification submited successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Qualification.getAll((err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "can not get qualification"
            });
        } else {
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Qualification"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Qualification.findData(req.params.qId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Qualification with id " + req.params.qId + " Id not found "
            });
        } else {
            console.log("qualification");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "qualification with id:" + req.params.qId
            });
        }
    });
};

// delete tab

exports.delete = (req, res) => {
    Qualification.remove(req.params.qId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found qualification with id ${req.params.qId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete qualification with id " + req.params.qId
                });
            }
        } else res.send({ message: `Qualification deleted successfully!` });
    });
};

// tab update
exports.Update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "please insert data" })
    }
    const update = new Qualification({
        vqualification: req.body.vqualification,
    });
    Qualification.Update(req.params.qId, update, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.json({
                success: true,
                message: "Database update successfully"
            });
        }
    })
}