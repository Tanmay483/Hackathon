const Images = require('../models/image.models');

// only image
exports.image = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!"
    });
  }

  const details = new Images({
    image: req.file.path.replace(/\\/g, '/'),

  });
  Images.image(details, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "failed to add details"
      });
    } else {
      console.log("Images add successfully");
      console.log(req.body);
      res.status(201).json({
        success: true,
        data: data,
        message: "add details scesfully"
      });
    }
  });
};