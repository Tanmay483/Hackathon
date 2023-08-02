const sql = require('../config/db');

// constructor
const Team = function (team) {
    this.vTeamName = team.vTeamName;
    this.sId = team.sId;
    this.hId = team.hId;
    this.leader = team.leader;
};

// POST 
Team.create = (team, result) => {
    // Generate teamId
    var TeamId = teamId();
    console.log("Generated TeamId: ", TeamId);
    console.log(team)
    const team1 = {
        vTeamName: team.vTeamName,
        iTeamId: TeamId
    };
    console.log(team1)

    sql.query("INSERT INTO team SET ?", team1, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("created Team: ", { Id: res.insertId, ...team });
        }
        const hackathon = {
            iTeamId: TeamId,
            hId: team.hId,
            sId: team.sId,
            leader: team.leader,
            Type : "team"
        };
        console.log(hackathon)

        sql.query("INSERT INTO applytohackathon SET ?", hackathon, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                result(null, { Id: res.insertId });
                console.log("applied to hackathon: ", res);
            }
        });
    });
};


function teamId() {
    var length = 8,
        charset = "!@#$%&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

// get all details
Team.getAll = (result) => {
    let query = "SELECT * FROM team";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Team: ", res);
        result(null, res);
    });
};

//get by id
Team.findId = (t_Id, result) => {
    let query = `SELECT * FROM team WHERE t_Id = ${t_Id}`
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("team details: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

//update
Team.update = (t_Id, team, result) => {
    let query = `UPDATE team SET vTeamName =? WHERE t_Id = ${t_Id}`;

    sql.query(query, [team.vTeamName], (err, data) => {
        if (err) {
            // throw err
            res.json({
                success: false,
                message: "Database update failed"
            });
        } else {
            console.log("database update successfully");
            result(null, "database update successfully")
        }

    });
}

//delete

Team.delete = (t_Id, result) => {
    let query = `DELETE FROM team WHERE t_Id = ${t_Id}`

    sql.query(query, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database delete failed"
            });
        } else {
            console.log("database delete successfully");
            result(null, "database delete successfully")
        }

    });
}

module.exports = Team;