const sql = require('../config/db');

// constructor
const Theme = function (theme) {
    this.hId = theme.hId
    this.vTheme = theme.vTheme;
    this.keyStatus = theme.keyStatus;
};

// POST 

Theme.create = (newtheme, result) => {
    sql.query("INSERT INTO hackathontheme SET ?", newtheme, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Theme created : ", { pId: res.insertId, ...newtheme });
        result(null, { pId: res.insertId, ...newtheme });
    });
};

//GET All 
Theme.getAll = (result) => {
    let query = "SELECT hackathontheme.theId,hackathontheme.hId, hackathontheme.vTheme , hackathontheme.keyStatus, hackathon.vTitle FROM hackathontheme INNER JOIN hackathon ON hackathontheme.hId = hackathon.hId";
    sql.query(query,(err,resp)=>{
        if(err) {
            result(`error: ${err.message}`)
        }
        else{
            result(null,resp)
        }
    })
};

// get by ID
Theme.findData = (theId, result) => {
    let query1 = `SELECT * FROM hackathontheme WHERE theId = ${theId}`;
    sql.query(query1, (err, result1) => {
        if (err) {
            result(err, `error executing query1`);
        } else if (result1.length === 0) {
            result(null, `not found theme with Id ${theId}`);
        } else {
            let hId = result1[0].hId;
            let query2 = `SELECT vTitle FROM hackathon WHERE hId = ${hId}`;
            sql.query(query2, (err, result2) => {
                if (err) {
                    result(err, `error executing query2`);
                } else if (result2.length === 0) {
                    result(null, `hackathon data not found in database`);
                } else {
                    const combineresult = {
                        Theme: result1[0],
                        hackathon: result2[0]
                    };
                    result(null, combineresult);
                }
            });
        }
    });
};


Theme.Update = (theId, theme, result) => {
    let query = `UPDATE hackathontheme SET hId = ?, vTheme =?,keyStatus=? WHERE theId = ?`

    sql.query(query, [theme.hId, theme.vTheme, theme.keyStatus, theId], (err, data) => {
        if (err) {
            console.error(err);
            result({
                success: false,
                message: "Database update failed",
            });
        } else {
            console.log("Theme change successfully");
            result(null, "Theme change successfully")
        }

    });
}

// DELET
Theme.remove = (theId, result) => {
    sql.query(`DELETE  FROM hackathontheme WHERE theId = ${theId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted theme with Id: ", theId);
        result(null, res);
    });
};

// get by hId 
Theme.findId = (hId, result) => {
    sql.query(`SELECT * FROM hackathontheme WHERE hId = ${hId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("theme: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Theme;
