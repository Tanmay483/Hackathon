const upload = require('../documentController/ads.image.control')

module.exports = app => {
  const Ads = require('../controller/ads.controller');

  var router = require("express").Router();

  // Create a new Ads
  router.post("/", upload, Ads.create);

  // Retrieve all Ads
  router.get("/", Ads.findAll);

  // update
  router.put('/:adId',Ads.update)

  // Delete a Ads with id
  router.delete("/:adId", Ads.delete);

  app.use('/api/ads', router);
};