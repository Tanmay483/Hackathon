module.exports = app => {
  const Template = require('../controller/template.controller');

  var router = require("express").Router();

  // Create a new Template
  router.post("/", Template.create);

  // Retrieve all Template
  router.get("/", Template.findAll);

  // update
  router.put('/:Id',Template.update)

  // Delete a Template with id
  router.delete("/:Id", Template.delete);

  // send mails
  router.post('/mail',Template.mail)

  app.use('/api/template', router);
};