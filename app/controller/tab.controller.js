const Tab = require('../models/tab.model');
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Description
    const tab = new Tab({
        hId: req.body.hId,
        vTitle: req.body.vTitle,
        vDiscription: req.body.vDiscription,
        tCreatedDate: req.body.tCreatedDate,
        tUpdatedDate: req.body.tUpdatedDate
    });

    //   POST

    Tab.create(tab, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "failed to generate tab"
            });
        } else {
            console.log("tab submited successfully");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: req.body,
                message: "tab submited successfully"
            });
        }
    });
};

// GET all  
exports.findAll = (req, res) => {
    Tab.getAll((err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "can not get tab list"
            });
        } else {
            console.log("tab");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Tab statement"
            });
        }
    });
};

// get by id
exports.findId = (req, res) => {
    Tab.findData(req.params.tabId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find tab with id " + req.params.tabId + " Id not found "
            });
        } else {
            console.log("types");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "tab with id:" + req.params.tabId
            });
        }
    });
};

// delete tab
exports.delete = (req, res) => {
    Tab.remove(req.params.tabId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found tab with id ${req.params.tabId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete tab with id " + req.params.tabId
                });
            }
        } else res.status(200).send({ message: `tab was deleted successfully!` });
    });
};

// tab update
exports.Update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "please insert data" })
    }
    const tab = new Tab({
        hId: req.body.hId,
        vTitle: req.body.vTitle,
        vDiscription: req.body.vDiscription,
        tCreatedDate: req.body.tCreatedDate,
        tUpdatedDate: req.body.tUpdatedDate
    });
    Tab.Update(req.params.tabId, tab, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Database update successfully"
            });
        }
    })
}

exports.findhId = (req, res) => {
    Tab.findHackathonTab(req.params.hId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find tab with id " + req.params.hId + " Id not found "
            });
        } else {
            res.status(200).json({
                success: true,
                data: data,
                message: "tab with id:" + req.params.hId
            });
        }
    });
};