const Sponser = require('../models/sponser.model');
const upload = require('../documentController/sponser.image.controller')

// Create
exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const sponser = new Sponser({
    companyName: req.body.companyName,
    personName: req.body.personName,
    contactNumber: req.body.contactNumber,
    Email: req.body.Email,
    image: req.file.path.replace(/\\/g, '/'),
    UserName: req.body.UserName
  });
  Sponser.create(sponser, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add sponser"
      });
    } else {
      console.log("Sponser add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "sponser add successfully"
      });
    }
  });
};

// GET all  
exports.findAll = (req, res) => {
  Sponser.getAll((err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("sponser detail");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "data"
      });
    }
  });
};

// DELETE Description 
exports.delete = (req, res) => {
  Sponser.remove(req.params.compId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found sponser  with id ${req.params.compId}.`
        });
      } else {
        res.send({
          message: "Could not delete sponser with id " + req.params.compId
        });
      }
    } else res.status(200).send({ message: `sponser was deleted successfully!` });
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
      companyName: req.body.companyName || '',
      personName: req.body.personName || '',
      contactNumber: req.body.contactNumber || '',
      Email: req.body.Email || '',
      image: req.file ? req.file.path.replace(/\\/g, '/') : '',
    };

    Sponser.update(req.params.compId, updatedData, (err, data) => {
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

// login
exports.login = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content cannot be empty!"
    });
    return;
  }
  const login = new Sponser({
    UserName: req.body.UserName,
    Password: req.body.Password,
  });

  Sponser.login(login.UserName, login.Password, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "login failed " + " Invalid Username or Password"
      });
    } else {
      console.log("login scessfull");
      console.log(req.body);
      res.status(200).json({
        success: true,
        // Id: data[0].Id,
        message: "login scessfull"

      });
    }
  });
};