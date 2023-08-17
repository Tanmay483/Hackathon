const Package = require('../models/package.model');

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const ads = new Package({
    Name: req.body.Name,
    Description: req.body.Description,
    Price: req.body.Price,
    Features: req.body.Features,
  });
  Package.create(ads, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add ads"
      });
    } else {
      console.log("Package add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "Package add successfully"
      });
    }
  });
};

// GET all  
exports.findAll = (req, res) => {
  Package.getAll((err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("Package detail");
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
  Package.remove(req.params.pacId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Package  with id ${req.params.pacId}.`
        });
      } else {
        res.send({
          message: "Could not delete Package with id " + req.params.pacId
        });
      }
    } else res.status(200).send({ message: `Package was deleted successfully!` });
  });
};


// update
exports.update = (req, res) => {
    const updatedData = {
      Name: req.body.Name || '',
      Description: req.body.Description || '',
      Price: req.body.Price || '',
      Features: req.body.Features || '',
    };

    Package.update(req.params.pacId, updatedData, (err, data) => {
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

// get by id
exports.findOne = (req, res) => {
    Package.findById(req.params.pacId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found package with id ${req.params.pacId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving package with id " + req.params.pacId
                });
            }
        } else {
            res.status(200).send({
                message: "package retrieved successfully",
                user: data
            });
        }
    });
};