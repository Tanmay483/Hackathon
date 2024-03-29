const Portfolio = require('../models/portfolio.model');

// insert
exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content can not be empty!"
        });
    }
    const portfolio = new Portfolio({
        sId: req.body.sId,
        Linkdin: '',
        Behance: '',
        Facebook: '',
        Instagram: '',
        Twitter: '',
        Git: '',
        Reddit: '',
        Figma: '',
        Blogger: '',
        Website: '',
        Other: '',
    });

    //   POST
    const values = { ...portfolio, ...req.body }

    Portfolio.create(values, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "failed to generate portfolio"
            });
        } else {
            console.log("portfolio submited successfully");
            console.log(req.body);
            res.status(201).json({
                success: true,
                data: req.body,
                message: "portfolio submited successfully"
            });
        }
    });
};

// GET all  

exports.findAll = (req, res) => {
    Portfolio.getAll((err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "can not get portfolio"
            });
        } else {
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Portfolio"
            });
        }
    });
};

// get by id

exports.findId = (req, res) => {
    Portfolio.findData(req.params.pId, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error can not find Portfolio with id " + req.params.pId + " Id not found "
            });
        } else {
            console.log("portfolio");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "portfolio with id:" + req.params.pId
            });
        }
    });
};

// delete tab

exports.delete = (req, res) => {
    Portfolio.remove(req.params.pId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found portfolio with id ${req.params.pId}.`
                });
            } else {
                res.send({
                    message: "Could not delete portfolio with id " + req.params.pId
                });
            }
        } else res.status(200).send({ message: `Portfolio deleted successfully!` });
    });
};

// tab update
exports.Update = (req, res) => {
    if (!req.body) {
        res.send({ message: "please insert data" })
    }
    const update = new Portfolio({
        sId: req.body.sId,
        Linkdin: req.body.Linkdin,
        Behance: req.body.Behance,
        Facebook: req.body.Facebook,
        Instagram: req.body.Instagram,
        Twitter: req.body.Twitter,
        Git: req.body.Git,
        Reddit: req.body.Reddit,
        Figma: req.body.Figma,
        Blogger: req.body.Blogger,
        Website: req.body.Website,
        Other: req.body.Other,
    });
    Portfolio.Update(req.params.pId, update, (err, data) => {
        if (err) {
            res.send({
                success: false,
                message: "Error while update database"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: data
            });
        }
    })
}