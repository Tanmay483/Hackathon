const Details = require('../models/details.model');
const upload = require('../documentController/image.controller')

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

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
      res.json({
        success: false,
        message: "failed to add details"
      });
    } else {
      console.log("Details add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "add details scesfully"
      });
    }
  });
};

// GET all  
exports.findAll = (req, res) => {
  Details.getAll((err, data) => {
    if (err) {
      res.status(404).json({
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
          message: `Not found hackathon  with id ${req.params.hId}.`
        });
      } else {
        res.send({
          message: "Could not delete hackathon with id " + req.params.hId
        });
      }
    } else res.status(200).send({ message: `hackathon was deleted successfully!` });
  });
};

// get brif
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

// update
exports.update = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      res.send({ message: "Failed to upload image." });
      return;
    }

    if (!req.body) {
      res.status(404).send({ message: "Content can not be empty!" });
      return;
    }

    const updatedData = {
      vTitle: req.body.vTitle || '',
      vImage: req.file ? req.file.path.replace(/\\/g, '/') : '',
      vUniversity: req.body.vUniversity || '',
      vAddress: req.body.vAddress || '',
      vBrif: req.body.vBrif || '',
      vDetails: req.body.vDetails || '',
      vDeadline: req.body.vDeadline || '',
      iTeamSize: req.body.iTeamSize || '',
      vEligibility: req.body.vEligibility || '',
      tCreatedDate: req.body.tCreatedDate || '',
      tUpdatedDate: req.body.tUpdatedDate || ''
    };

    Details.update(req.params.hId, updatedData, (err, data) => {
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
  });
};

// only image
exports.image = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const details = new Details({
    vTitle: '',
    vImage: req.file.path.replace(/\\/g, '/'),
    vUniversity: '',
    vAddress: '',
    vBrif: '',
    vDetails: '',
    vDeadline: '',
    iTeamSize: '',
    vEligibility: '',
    tCreatedDate: '',
    tUpdatedDate: '',
  });

  //    POST

  Details.image(details, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add details"
      });
    } else {
      console.log("Details add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "add details scesfully"
      });
    }
  });
};

// search
exports.search = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content cannot be empty!"
    });
    return;
  }
  const search = new Details({
    search: req.body.search
  });

  Details.search(search.search, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "search failed "
      });
    } else {
      console.log("search scessfull");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "search scessfull"

      });
    }
  });
};

//
exports.findNumber = (req, res) => {
  Details.findNumber(req.params.hId, res, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error retrieving data with id " + req.params.hId + " Id not found ",
      });
    } else {
      console.log("Registration count retrieved successfully");
      res.status(200).json({
        success: true,
        data: data,
        message: "Count of registrations for hackathon with id: " + req.params.hId,
      });
    }
  });
};