const upload = require('../documentController/image.controller')
const conn = require('../config/db');

module.exports = app => {
  const Description = require('../controller/details.controller');

  var router = require("express").Router();

  // Create a new Description
  router.post("/", upload, Description.create);

  // Retrieve all Description
  router.get("/", Description.findAll);

  // Retrieve a single Description with id
  router.get("/:hId", Description.findOne);

  // Retrieve a single Description with id
  router.get("/brif/:hId", Description.brif);

  // update
  router.put('/:hId',Description.update)

  // Delete a Description with id
  router.delete("/:hId", Description.delete);

  app.use('/api/hackathon', router);
};

