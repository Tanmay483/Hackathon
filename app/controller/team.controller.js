const Team = require('../models/team.model')

// create
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const team = new Team({
        vTeamName: req.body.vTeamName,
        hId : req.body.hId,
        sId : req.body.sId
    })
    console.lo

    Team.create(team, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Team creation failed"
            });
        }
        else {
            console.log("Team created successfully");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: req.body,
                message: "Team created successfully"
            });
        }
    })
}

// find all
exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "can not get data"
            });
        } else {
            console.log("Team detail");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "data"
            });
        }
    });
};

//find by id
exports.findId = (req, res) => {
    Team.findId(req.params.t_Id, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "error retriving data with id " + req.params.t_Id + " Id not found "
            });
        } else {
            console.log("Team:");
            console.log(req.body);
            res.status(200).json({
                success: true,
                data: data,
                message: "Team with id:" + req.params.t_Id
            });
        }
    });
};

//update
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "please insert data" })
    }
    const team = new Team({
        vTeamName: req.body.vTeamName
    });
    Team.update(req.params.t_Id, team, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while updating Team"
            });
        }
        else {
            res.json({
                success: true,
                message: "team updated successfully"
            });
        }
    })
}

// delete
exports.delete = (req, res) => {
    Team.delete(req.params.t_Id, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error while deleting Team"
            });
        }
        else {
            res.json({
                success: true,
                message: "team deleted successfully"
            });
        }
    })
}