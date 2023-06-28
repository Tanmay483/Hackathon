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
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Theme;
