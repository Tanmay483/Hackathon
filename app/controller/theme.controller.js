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
        hId: req.body.hId,
        vTheme: req.body.vTheme,
        keyStatus: req.body.keyStatus,
    });

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
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching Theme list."
            });
        } else {
            if (data.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No themes found."
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: data,
                    message: "Themes fetched successfully."
                });
            }
        }
    });
};


// get by id
exports.findId = (req, res) => {
    Theme.findData(req.params.theId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "Error: " + err
            });
        } else {
            if (typeof data === "string") {
                res.status(404).json({
                    success: false,
                    message: data
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: data,
                    message: "Theme with id:" + req.params.theId
                });
            }
        }
    });
};

// update theme
exports.Update = (req, res) => {
    if (!req.body) {
        res.send({ message: "please insert data" })
    }
    const theme = new Theme({
        hId: req.body.hId,
        vTheme: req.body.vTheme,
        keyStatus: req.body.keyStatus,
    });
    Theme.Update(req.params.theId, theme, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while update database",
                error : err
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

// delete
exports.delete = (req, res) => {
    Theme.remove(req.params.theId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Theme  with id ${req.params.theId}.`
                });
            } else {
                res.send({
                    message: "Could not delete Theme with id " + req.params.theId
                });
            }
        } else res.status(200).send({ message: `Theme was deleted successfully!` });
    });
};

// get by id
exports.findById = (req, res) => {
    Theme.findId(req.params.hId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Theme with id " + req.params.hId + " Id not found "
            });
        } else {
            console.log("Theme");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Theme with id:" + req.params.hId
            });
        }
    });
};