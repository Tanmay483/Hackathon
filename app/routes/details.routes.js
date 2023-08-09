const upload = require('../documentController/image.controller')

module.exports = app => {
  const Details = require('../controller/details.controller');

  var router = require("express").Router();

  // Create a new Details
  router.post("/", upload, Details.create);

  // Retrieve all Details
  router.get("/", Details.findAll);

  // Retrieve a single Details with id
  router.get("/:hId", Details.findOne);

  // Retrieve a single Details with id
  router.get("/brif/:hId", Details.brif);

  // update
  router.put('/:hId',Details.update)

  // Delete a Details with id
  router.delete("/:hId", Details.delete);

  //only image
  router.post("/image", upload, Details.image);

  app.use('/api/hackathon', router);
};