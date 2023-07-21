module.exports = app => {
    const categories = require('../controller/categories.controller');

    var router = require("express").Router();

    // Create a new categories
    router.post("/", categories.create);

    // Retrieve all categories
    router.get("/", categories.findAll);

    //retrieve categories by id
    router.get("/:catId", categories.findId)

    //update categories
    router.put('/update/:catId',categories.Update)

    //delete categories
    router.delete('/delete/:catId' , categories.delete)

    // categories and subcategories
    router.get('/categorylist/:catId',categories.subCategories)

    app.use('/api/categories', router);
};