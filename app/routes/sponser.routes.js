const upload = require('../documentController/sponser.image.controller')

module.exports = app => {
  const Sponser = require('../controller/sponser.controller');

  var router = require("express").Router();

  // Create a new Sponser
  router.post("/", upload, Sponser.create);

  // Retrieve all Sponser
  router.get("/", Sponser.findAll);

  // update
  router.put('/:compId',Sponser.update)

  // Delete a Sponser with id
  router.delete("/:compId", Sponser.delete);

  //login
  router.post('/login',Sponser.login);

  app.use('/api/sponsor', router);
};