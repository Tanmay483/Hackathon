const Ads = require('../models/ads.model');
const upload = require('../documentController/ads.image.control')

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const ads = new Ads({
    vTitle: req.body.vTitle,
    image: req.file.path.replace(/\\/g, '/'),
    tCreatedDate: req.body.tCreatedDate,
  });

  //    POST

  Ads.create(ads, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add ads"
      });
    } else {
      console.log("Ads add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "ads add successfully"
      });
    }
  });
};

// GET all  
exports.findAll = (req, res) => {
  Ads.getAll((err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("ads detail");
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
  Ads.remove(req.params.adId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ad  with id ${req.params.adId}.`
        });
      } else {
        res.send({
          message: "Could not delete ad with id " + req.params.adId
        });
      }
    } else res.status(200).send({ message: `ad was deleted successfully!` });
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
      image: req.file ? req.file.path.replace(/\\/g, '/') : '',
      tCreatedDate: req.body.tCreatedDate || '',
    };

    Ads.update(req.params.adId, updatedData, (err, data) => {
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