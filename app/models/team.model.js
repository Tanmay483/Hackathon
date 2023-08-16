const sql = require('../config/db');
const mail = require('../middleware/teamRegistration.mail')

// constructor
const Team = function (team) {
    this.vTeamName = team.vTeamName;
    this.sId = team.sId;
    this.hId = team.hId;
    this.leader = team.leader;
};

// POST 
Team.create = (team, res) => {
    // Generate teamId
    var TeamId = teamId();
    console.log("Generated TeamId: ", TeamId);

    const team1 = {
        vTeamName: team.vTeamName,
        iTeamId: TeamId
    };

    const hackathon = {
        iTeamId: TeamId,
        hId: team.hId,
        sId: team.sId,
        leader: team.leader,
        vtype: "team"
    };

    const hackathonId = hackathon.hId
    const studentId = hackathon.sId

    const query1 = "INSERT INTO team SET ?"
    const query2 = "INSERT INTO applytohackathon SET ?"
    const query3 = `SELECT vTitle FROM hackathon WHERE hId = ${hackathonId}`
    const query4 = `SELECT vEmail FROM student WHERE Id = ${studentId}`

    sql.query(query1, team1, (err, result1) => {
        if (err) {
            console.error('Error executing query1:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        sql.query(query2, hackathon, (err, result2) => {
            if (err) {
                console.error('Error executing query2:', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            sql.query(query3, (err, result3) => {
                if (err) {
                    console.error('Error executing query3:', err);
                    return res.status(500).json({ error: 'Something went wrong' });
                }
                sql.query(query4, (err, result4) => {
                    if (err) {
                        console.error('Error executing query4:', err);
                        return res.status(500).json({ error: 'Something went wrong' });
                    }


                    const hackathonTitle = result3[0].vTitle;
                    const studentEmail = result4[0].vEmail;

                    //send mail
                    mail(studentEmail,hackathonTitle,hackathon.iTeamId)
                    
                    // response
                    const combinedResults = {
                        hackathonTitle: result3[0],
                        studentDetails: result4[0],
                        inputData: team
                    };
                    res.json(combinedResults);
                })
            })
        })
    })

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