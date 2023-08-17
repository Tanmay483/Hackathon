module.exports = app => {
  const Package = require('../controller/package.controller');

  var router = require("express").Router();

  // Create a new Package
  router.post("/", Package.create);

  // Retrieve all Package
  router.get("/", Package.findAll);

  // update
  router.put('/:pacId',Package.update)

  // Delete a Package with id
  router.delete("/:pacId", Package.delete);

  //get by id
  router.get('/:pacId',Package.findOne)

  app.use('/api/package', router);
};