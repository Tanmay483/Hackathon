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
  Registration.findData(req.params.iParentId, (err, data) => {
    if (err) {
      res.status(404).json({ 
        success: false,
        message: "error can not find type with id "+ req.params.iParentId +" Id not found "
      });
    } else {
      console.log("types");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "type with id:"+req.params.iParentId
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
  