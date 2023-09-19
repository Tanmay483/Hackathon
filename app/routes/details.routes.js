const upload = require('../documentController/image.controller')

module.exports = app => {
  const Details = require('../controller/details.controller');

  var router = require("express").Router();

  // Create a new Details
  router.post("/add", upload, Details.create);

  // Retrieve all Details
  router.get("/all", Details.findAll);

  // Retrieve a single Details with id
  router.get("/brif/:hId", Details.brif);

  // update
  router.put('/:hId',Details.update)

  // Delete a Details with id
  router.delete("/:hId", Details.delete);

  //only image
  router.post("/image", upload, Details.image);

  // search
  router.post("/search",Details.search)

  // student apply for hackathon
  router.get('/student/:hId', Details.findNumber)

  app.use('/api/hackathon', router);
};