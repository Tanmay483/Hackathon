const Comment = require('../models/comment.model');


// Create and Save a new Description
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Description
    const comment = new Comment({
        hId: req.body.hId,
        Id: req.body.Id,
        vcomment: req.body.vcomment,
    });

    //   POST

    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the Comment."
            });
        else res.send(data);
    });
};

// GET all  

exports.findAll = (req, res) => {
    const title = req.query.title;

    Comment.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving description."
            });
        else res.send(data);
    });
};

