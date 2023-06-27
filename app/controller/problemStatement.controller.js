const Problem = require('../models/problemStatement.models');


// Create and Save a new Description
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Description
    const contact = new Problem({
        hId: req.body.hId,
        theId: req.body.theId,
        vProblemStatement: req.body.vProblemStatement
    });

    //   POST

    Problem.create(contact, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Problem satement failed to add"
            });
        } else {
            console.log("problem statement submited successfully");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: req.body,
                message: "problem statement submited successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Problem.getAll((err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "can not get problem statement list"
            });
        } else {
            console.log("contact");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Problem statement"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Problem.findData(req.params.pId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find problemStatement with id " + req.params.pId + " Id not found "
            });
        } else {
            console.log("types");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "problemStatement with id:" + req.params.pId
            });
        }
    });
};

// delete problemstatement

exports.delete = (req, res) => {
    Problem.remove(req.params.pId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found problemstatement with id ${req.params.pId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete problemstatement with id " + req.params.pId
        });
      }
    } else res.send({ message: `problemstatement was deleted successfully!` });
  });
};

