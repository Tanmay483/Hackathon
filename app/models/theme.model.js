const sql = require('../config/db');

// constructor
const Theme = function (theme) {

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

        console.log("Theme created : ", { pId: res.insertpId, ...newtheme });
        result(null, { pId: res.insertpId, ...newtheme });
    });
};

//GET All

Theme.getAll = (result) => {
    let query = "SELECT * FROM hackathontheme";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("theme: ", res);
        result(null, res);
    });
};

// get by ID
Theme.findData = (theId, result) => {
    sql.query(`SELECT * FROM hackathontheme WHERE theId = ${theId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("theme: ", res);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Theme.Update = (theId, theme, result) => {
    let query = `UPDATE hackathontheme SET vTheme =?,keyStatus=? WHERE theId = ?`

    sql.query(query, [theme.vTheme, theme.keyStatus,theId], (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database update failed"
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

module.exports = Theme;
