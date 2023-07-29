const sql = require('../config/db');

// constructor

const Apply = function (apply) {
    this.hId = apply.hId;
    this.sId = apply.sId;
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