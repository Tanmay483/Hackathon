const Details = require('../models/details.model');

// Create and Save a new Description

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Description
  const details = new Details({
    vTitle: req.body.vTitle,
    vImage: req.file.path.replace(/\\/g, '/'),
    vUniversity: req.body.vUniversity,
    vAddress: req.body.vAddress,
    vBrif: req.body.vBrif,
    vDetails: req.body.vDetails,
    vDeadline: req.body.vDeadline,
    iTeamSize: req.body.iTeamSize,
    vEligibility: req.body.vEligibility,
    tCreatedDate: req.body.tCreatedDate,
    tUpdatedDate: req.body.tUpdatedDate,
  });

  //    POST

  Details.create(details, (err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "failed to add details"
      });
    } else {
      console.log("Details add successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: req.body,
        message: "add details scesfully"
      });
    }
  });
};

// GET all  

exports.findAll = (req, res) => {
  Details.getAll((err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("hackathon detail");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "data"
      });
    }
  });
};

// GET by Id

exports.findOne = (req, res) => {
  Details.findById(req.params.hId, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error retriving data with id " + req.params.hId + " Id not found "
      });
    } else {
      console.log("Registration changed successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "User with id:" + req.params.hId
      });
    }
  });
};

// DELETE Description 

exports.delete = (req, res) => {
  Details.remove(req.params.hId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Description with id ${req.params.hId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Description with id " + req.params.hId
        });
      }
    } else res.send({ message: `Description was deleted successfully!` });
  });
};

exports.brif = (req, res) => {
  Details.ById(req.params.hId, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error retriving data with id " + req.params.hId + " Id not found "
      });
    } else {
      console.log("Registration changed successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "User with id:" + req.params.hId
      });
    }
  });
};