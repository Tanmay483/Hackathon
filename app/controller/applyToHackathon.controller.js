const Apply = require('../models/applyToHackathon.model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const apply = new Apply({
        hId: req.body.hId,
        sId: req.body.sId,
    });
    Apply.create(apply, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "failed to  apply"
            });
        } else {
            console.log("applied successfully");
            console.log(req.body);
            const responseData = { aId: data.insertaId, ...req.body };
            res.status(200).json({
                success: true,
                data: responseData,
                message: "applied successfully"
            });
        }
    });
};
