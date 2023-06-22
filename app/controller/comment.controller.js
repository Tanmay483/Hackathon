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
        if (err) {
            res.status(400).json({
              success: false,
              message: "comment failed"
            });
          } else {
            console.log("comment submited successfully");
            console.log(req.body);
            res.status(200).json({
              success: true,
              data: req.body,
              message: "Thankyou for let us know your thoughts "
            });
          }
    });
};

// GET all  

exports.findAll = (req, res) => {
    const title = req.query.title;

    Comment.getAll(title, (err, data) => {
        if (err) {
            res.status(400).json({ 
              success: false,
              message: "can not get comment"
            });
          } else {
            console.log("comments");
            console.log(req.body);
            res.status(200).json({
              success: true,
              data: data,
              message: "comments"
            });
          }
    });
};

