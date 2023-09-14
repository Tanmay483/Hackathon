const Template = require('../models/template.model');

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const ads = new Template({
    Template: req.body.template,
    Type: req.body.type,
    Title: req.body.title
  });

  //    POST

  Template.create(ads, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add template"
      });
    } else {
      console.log("Template add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "template add successfully"
      });
    }
  });
};

// GET all  
exports.findAll = (req, res) => {
  Template.getAll((err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("template detail");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "data"
      });
    }
  });
};


// DELETE
exports.delete = (req, res) => {
  Template.remove(req.params.Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found template with id ${req.params.Id}.`
        });
      } else {
        res.send({
          message: "Could not delete template with id " + req.params.Id
        });
      }
    } else res.status(200).send({ message: `template was deleted successfully!` });
  });
};


// update
exports.update = (req, res) => {

  const updatedData = {
    Template: req.body.template || '',
    Type: req.body.type || '',
    Title: req.body.title || ''
  };

  Template.update(req.params.Id, updatedData, (err, data) => {
    if (err) {
      console.error("Error updating data:", err);
      res.send({
        message: "Failed to update data.",
        error: err
      });
      return;
    } else {
      res.status(200).json({
        status: 1,
        message: "Token verify sucessfully",
        data: data
      });
    }
  });
};

//send mail
exports.mail = (req, res) => {
  const studentIds = req.body.studentIds;
  const tempId = req.body.tempId

  Template.mail(tempId, studentIds, (err, data) => {
    if (err) {
      res.json({
        success: true,
        message: "Email sent to: " +  err.message
      });
    } else {
      res.status(200).json({
        success: false,
        message: "some error occurred",
      });
    }
  });
};