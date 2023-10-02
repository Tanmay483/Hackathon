const Admin = require('../models/admin.model');

//insert
exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content can not be empty!"
        });
    }
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password,
    });
    Admin.create(admin, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "failed to add admin"
            });
        } else {
            res.status(201).json({
                success: true,
                data: data,
                message: "admin add successfully"
            });
        }
    });
};

// GET all  
exports.findAll = (req, res) => {
    Admin.getAll((err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "can not get data"
            });
        } else {
            res.status(200).json({
                success: true,
                data: data,
                message: "data"
            });
        }
    });
};

// DELETE
exports.delete = (req, res) => {
    Admin.remove(req.params.adminId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found admin with id ${req.params.adminId}.`
                });
            } else {
                res.send({
                    message: "Could not delete admin with id " + req.params.adminId
                });
            }
        } else res.status(200).send({ message: `admin was deleted successfully!` });
    });
};

// update
exports.update = (req, res) => {
    const updatedData = {
        username: req.body.username || '',
        password: req.body.password || '',
    };

    Admin.update(req.params.adminId, updatedData, (err, data) => {
        if (err) {
            console.error("Error updating data:", err);
            res.send({ message: "Failed to update data." });
            return;
        } else {
            res.status(200).json({
                status: 1,
                message: "Token verify sucessfully",
                data: data
            });
        }
    });
};

// login
exports.Login = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content can not be empty!"
        });
    }
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password,
    });
    Admin.Login(admin, res,(err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Invalid username or password"
            });
        } else {
            res.status(201).json({
                success: true,
                message: "Login successful"
            });
        }
    });
};