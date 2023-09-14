const { query } = require('express');
const sql = require('../config/db');

// constructor

const Apply = function (apply) {
    this.hId = apply.hId;
    this.sId = apply.sId;
    this.iTeamId = apply.iTeamId;
    this.leader = apply.leader;
    this.vtype = apply.vtype;
    this.tId = apply.tId;
    this.domId = apply.domId;
    this.themeId = apply.themeId;
}

Apply.create = (apply, result) => {
    let query1 = `SELECT * FROM team WHERE BINARY iTeamId = ?`;
    sql.query(query1, [apply.iTeamId], (teamErr, response1) => {
        if (teamErr) {
            console.error(teamErr);
            result(teamErr, null);
            return;
        }

        if (response1.length === 0) {
            const error = new Error("Invalid iTeamId");
            result(error, null);
            return;
        }
        // iTeamId exists, proceed with insertion
        let query2 = `INSERT INTO applytohackathon SET ?`;
        sql.query(query2, apply, (applyErr, response2) => {
            if (applyErr) {
                console.error(applyErr);
                result(applyErr, null);
                return;
            }
            else {
                result(null, { aId: response2.insertId, ...apply })
            }
        })
    })
}

//
Apply.find = (apply, result) => {
    let query1 = `SELECT * FROM applytohackathon WHERE BINARY iTeamId = ?`;
    sql.query(query1, [apply.iTeamId], (teamErr, response1) => {
        if (teamErr) {
            console.error(teamErr);
            result({
                success: false,
                message: "Failed to verify team information"
            }, null);
            return;
        }
        if (response1.length === 0) {
            result({
                success: false,
                message: "Invalid iTeamId"
            }, null);
            return;
        }
        let hId = response1[0].hId
        let query2 = `SELECT iTeamSize FROM hackathon WHERE hId = ${hId}`
        sql.query(query2, (err, result2) => {
            if (err) {
                console.error(err);
                result({
                    success: false,
                    message: "Failed to fetch hackathon information"
                }, null);
                return;
            }
            let query4 = `SELECT vTeamName FROM team WHERE iTeamId = '${apply.iTeamId}'`
            sql.query(query4, (err, resp4) => {
                if (err) {
                    console.error(err);
                    result({
                        success: false,
                        message: "Failed to fetch team name"
                    }, null);
                    return
                }
                // query3
                let teamSize = result2[0].iTeamSize; // total size of team
                let query3 = `SELECT * FROM applytohackathon WHERE iTeamId = '${apply.iTeamId}' AND hId = ${hId}`
                sql.query(query3, (err, result3) => {
                    if (err) {
                        console.error(err);
                        result({
                            success: false,
                            message: "Failed to fetch information"
                        }, null);
                        return;
                    }
                    else {
                        let length = result3.length    // student count of applytohackathon for team
                        let count = teamSize - length
                        console.log(count, teamSize)
                        if (length <= teamSize) {
                            result(null, {
                                message: "Team id verify successful",
                                teamSize: teamSize,
                                numberOfStudentApplied: result3.length,
                                numberOfStudetRemain: count,
                                teamName: resp4[0].vTeamName    
                            });
                        }
                        else {
                            result({
                                success: false,
                                message: "team is full"
                            }, null);
                            return;
                        }
                    }
                })
            })
        });
    });
};

module.exports = Apply