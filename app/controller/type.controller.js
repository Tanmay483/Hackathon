const Type = require('../models/type.model');
const Registration = require('../models/type.model');

// get all
exports.findAll = (req, res) => {
  Registration.getAll((err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "can not find types"
      });
    } else {
      console.log("Types:");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "types"
      });
    }
  });
};

// get by id

exports.findId = (req, res) => {
  Registration.findData(req.params.tId, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error can not find type with id " + req.params.tId + " Id not found "
      });
    } else {
      console.log("types");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "type with id:" + req.params.tId
      });
    }
  });
};


// iParentId = 0 
exports.findType = (req, res) => {
  Registration.findType((err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "cannot find domains "
      });
    } else {
      console.log("domain:");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "domains"
      });
    }
  });
};

// insert
exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const type = new Type({
    vType: req.body.vType,
    iParentId: req.body.iParentId,
  });

  //    POST

  Type.create(type, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add type"
      });
    } else {
      console.log("Type add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "type add successfully"
      });
    }
  });
};

// update
exports.update = (req, res) => {
    const updatedData = {
      vType: req.body.vType || '',
      iParentId: req.body.iParentId || '',
    };

    Type.update(req.params.tId, updatedData, (err, data) => {
      if (err) {
        console.error("Error updating data:", err);
        res.send({ message: "Failed to update data." });
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

// delete
exports.delete = (req, res) => {
  Type.remove(req.params.tId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type  with id ${req.params.tId}.`
        });
      } else {
        res.send({
          message: "Could not delete Type with id " + req.params.tId
        });
      }
    } else res.status(200).send({ message: `Type was deleted successfully!` });
  });
};

// get all domain
exports.findAllDomain = (req, res) => {
  Registration.getAllDomain((err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "can not find Domain"
      });
    } else {
      res.status(200).json({
        success: true,
        data: data,
        message: "Domain"
      });
    }
  });
};

//
exports.findById = (req, res) => {
  Registration.findDataById(req.params.tId, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error can not find type with id " + req.params.tId + " Id not found "
      });
    } else {
      console.log("types");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "type with id:" + req.params.tId
      });
    }
  });
};
