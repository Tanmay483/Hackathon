const Registration = require('../models/registrstion.model');

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const registration = new Registration({
     vName : req.body.vName,
     vEmail : req.body.vEmail,
     vMobileNumber: req.body.vMobileNumber,
     vAddress : req.body.vAddress,
     vQualification : req.body.vQualification,
     vProfession : req.body.vProfession,
     vTeamType : req.body.vTeamType,
     iNumberOfMembers : req.body.iNumberOfMembers,
     vProblemStatement : req.body.vProblemStatement,
     Document : req.file.filename,
    });
    // POST
    
    Registration.create(registration, (err, data) => {
    if (err)
    res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student detail."
      });
    else res.send(data);
  });
};

// GET all  categories

exports.findAll = (req, res) => {
  // const title = req.query.title;

  Registration.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    else res.send(data);
  });
};

//GET sub category

exports.findId = (req, res) => {
  Registration.findId(req.params.Id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving srudent with Id " + req.params.Id
          });
        }
      } else res.send(data);
    });
  };

// PUT 

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Registration.updateById(
    req.params.Id,
    new Registration(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found detail with id ${req.params.Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating detail with id " + req.params.Id
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Registration.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found student with id ${req.params.Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete student with id " + req.params.Id
        });
      }
    } else res.send({ message: `details was deleted successfully!` });
  });
};