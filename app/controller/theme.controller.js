const Theme = require('../models/theme.model');
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a theme
    const contact = new Theme({
        vTheme: req.body.vTheme,
        keyStatus: req.body.keyStatus,
    });

    //   POST

    Theme.create(contact, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Theme failed to add"
            });
        } else {
            console.log("Theme add successfully");
            console.log(req.body);
            res.status(201).json({
                success: true,
                data: req.body,
                message: "Theme add successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Theme.getAll((err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "can not get Theme list"
            });
        } else {
            console.log("theme");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Theme"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Theme.findData(req.params.theId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Theme with id " + req.params.theId + " Id not found "
            });
        } else {
            console.log("Theme");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Theme with id:" + req.params.theId
            });
        }
    });
};

// update theme

exports.Update = (req, res) => {
    if (!req.body) {
        res.send({ message: "please insert data" })
    }
    const theme = new Theme({
        vTheme: req.body.vTheme,
        keyStatus: req.body.keyStatus,
    });
    Theme.Update(req.params.theId, theme, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Database update successfully",
            });
        }
    })
}