const Registration = require('../models/registrstion.model');

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
    vName: req.body.vName,
    vEmail: req.body.vEmail,
    vMobileNumber: req.body.vMobileNumber,
    vGitUrl: req.body.vGitUrl,
    vAddress: req.body.vAddress,
    vQualification: req.body.vQualification,
    vProfession: req.body.vProfession,
    vTeamType: req.body.vTeamType,
    iNumberOfMembers: req.body.iNumberOfMembers,
    vProblemStatement: '',
    Document: req.file.path,
  });
  // POST

  Registration.create(registration, (err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Registration failed"
      });
    } else {
      console.log("Registration add successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: req.body,
        message: "congratulation your entry has been register successfully"
      });
    }
  });
};

// get all

exports.findAll = (req, res) => {
  Registration.getAll((err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("user detail");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "data"
      });
    }
  });
};

// get by id

exports.findId = (req, res) => {
  Registration.findId(req.params.Id, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error retriving data with id " + req.params.Id + " Id not found "
      });
    } else {
      console.log("Registration changed successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "User with id:" + req.params.Id
      });
    }
  });
};
