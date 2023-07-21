const Categories = require('../models/categories.model');

// insert
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const categories = new Categories({
        vcatagoryName: req.body.vcatagoryName,
        iParentId: req.body.iParentId,
    });

    //   POST
    Categories.create(categories, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "failed to generate categories"
            });
        } else {
            console.log("categories submited successfully");
            console.log(req.body);
            const responseData = {catId: data.insertId,...req.body };
            res.status(200).json({
                success: true,
                data: responseData,
                message: "categories submited successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Categories.getAll((err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "can not get categories"
            });
        } else {
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Categories"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Categories.findData(req.params.catId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Categories with id " + req.params.catId + " Id not found "
            });
        } else {
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Categories with id:" + req.params.catId
            });
        }
    });
};

// delete 

exports.delete = (req, res) => {
    Categories.remove(req.params.catId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categories with id ${req.params.catId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete categories with id " + req.params.catId
                });
            }
        } else res.send({ message: `Categories deleted successfully!` });
    });
};

// update
exports.Update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "please insert data" })
    }
    const update = new Categories({
        vcatagoryName: req.body.vcatagoryName,
        iParentId: req.body.iParentId,
    });
    Categories.Update(req.params.catId, update, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.json({
                success: true,
                message: "Database update successfully"
            });
        }
    })
}

// get categories and sub categories
exports.subCategories = (req, res) => {
    Categories.subCategories(req.params.catId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found categories with id ${req.params.catId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving categories with Id ' + req.params.catId,
          });
        }
      } else{
        res.json({
            success: true,
            Data: data,
            message: "Categories and subcategories:"
        });
      }
    });
  
  };