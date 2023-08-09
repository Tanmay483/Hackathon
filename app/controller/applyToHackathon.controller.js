const Apply = require('../models/applyToHackathon.model')

exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content can not be empty!"
        });
    }
    const apply = new Apply({
        hId: req.body.hId,
        sId: req.body.sId,
        iTeamId: req.body.iTeamId,
        leader: req.body.leader,
        vtype: req.body.vtype,
        tId	: req.body.tId,
        domId: req.body.domId,
        themeId : req.body.themeId    
    });
    Apply.create(apply, (err, data) => {
        if (err) {
            re.status(400).json({
                success: false,
                message: "failed to  apply"
            });
        } else {
            console.log("applied successfully");
            const responseData = { aId: data.insertaId, ...req.body };
            res.status(200).json({
                success: true,
                data: responseData,
                message: "applied successfully"
            });
        }
    });
};
