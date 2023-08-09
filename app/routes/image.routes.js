const upload = require('../documentController/image.controller')

module.exports = app => {
  const Image = require('../controller/image.controller');

  var router = require("express").Router();

  //only image
  router.post("/", upload, Image.image);

  app.use('/api/Image', router);
};