module.exports = app => {
  const Admin = require('../controller/admin.controller');

  var router = require("express").Router();

  // Create a new Admin
  router.post("/", Admin.create);

  // Retrieve all Admin
  router.get("/all", Admin.findAll);

  // update
  router.put('/update/:adminId',Admin.update)

  // Delete a Admin with id
  router.delete("/delete/:adminId", Admin.delete);

  // login
  router.post('/login', Admin.Login)

  app.use('/api/admin', router);
};