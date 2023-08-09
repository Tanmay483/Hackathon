const sql = require('../config/db');

// constructor

const Apply = function (apply) {
    this.hId = apply.hId;
    this.sId = apply.sId;
    this.iTeamId = apply.iTeamId;
    this.leader = apply.leader;
    this.vtype = apply.vtype;
    this.tId = apply.tId;
    this.domId  = apply.domId;
    this.themeId = apply.themeId;
}

Apply.create = (apply, result) => {
    let query = `INSERT INTO applytohackathon SET ?`
    sql.query(query, apply, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return;
        }
        else {
            console.log("Apply to Hackathon: ", { aId: res.insertaId, ...apply });
            result(null, { aId: res.insertaId, ...apply });
        }
    })
}

module.exports = Apply