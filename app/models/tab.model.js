const sql = require('../config/db');

// constructor
const Tab = function (tab) {

    this.hId = tab.hId;
    this.vTitle = tab.vTitle;
    this.vDiscription = tab.vDiscription;
    this.tCreatedDate = tab.tCreatedDate;
    this.tUpdatedDate = tab.tUpdatedDate;
};

// POST 
Tab.create = (newtab, result) => {
    sql.query("INSERT INTO tab SET ?", newtab, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created =tab: ", { tabId: res.inserttabId, ...newtab });
        result(null, { tabId: res.inserttabId, ...newtab });
    });
};

//GET All
Tab.getAll = (result) => {
    let query = "SELECT * FROM tab";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tabs: ", res);
        result(null, res);
    });
};

// get by ID
Tab.findData = (tabId, result) => {
    sql.query(`SELECT * FROM tab WHERE tabId = ${tabId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("tab: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// delete problemStatement
Tab.remove = (tabId, result) => {
    sql.query(`DELETE  FROM tab WHERE tabId = ${tabId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted ptoblemstatement with Id: ", tabId);
        result(null, res);
    });
};

// update tab
Tab.Update = (tabId, tab, result) => {
    let query = `UPDATE tab SET hId =?,vTitle=?,vDiscription=?,tCreatedDate=?,tUpdatedDate=? WHERE tabId = ?`

    sql.query(query, [tab.hId, tab.vTitle, tab.vDiscription, tab.tCreatedDate, tab.tUpdatedDate, tabId], (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database update failed"
            });
        } else {
            console.log("Tab change successfully");
            result(null, "Tab change successfully")
        }

    });
}

// get by ID
Tab.findHackathonTab = (hId, result) => {
    sql.query(`SELECT * FROM tab WHERE hId = ${hId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Tab;
