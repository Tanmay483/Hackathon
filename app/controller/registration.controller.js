const Registration = require('../models/registrstion.model');
const jwt = require('jsonwebtoken')

// Create and Save
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
     vGitUrl: req.body.vGitUrl,
     vAddress : req.body.vAddress,
     vQualification : req.body.vQualification,
     vProfession : req.body.vProfession,
     vTeamType : req.body.vTeamType,
     iNumberOfMembers : req.body.iNumberOfMembers,
     vProblemStatement : '',
     Document : req.file.path,
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


// get all


exports.findAll = (req, res) => {
  Registration.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving details."
      });
    else res.send(data);
  });
};

// get by id


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
  