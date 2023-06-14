const Registration = require('../models/type.model');

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
  Registration.findData(req.params.iParentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found type with id ${req.params.iParentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving type with Id " + req.params.iParentId
          });
        }
      } else res.send(data);
    });
  };


// iParentId = 0 

  exports.findType = (req, res) => {
    Registration.findType((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving details."
        });
      else res.send(data);
    });
  };
  