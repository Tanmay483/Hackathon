const sql = require('../config/db');

// constructor
const Details = function (details) {

    this.vTitle = details.vTitle;
    this.vImage = "http://localhost:8085/" + details.vImage;
    this.vUniversity = details.vUniversity;
    this.vAddress = details.vAddress;
    this.vBrif = details.vBrif;
    this.vDetails = details.vDetails;
    this.vDeadline = details.vDeadline;
    this.iTeamSize = details.iTeamSize;
    this.iTeamSize = details.iTeamSize;
    this.vEligibility = details.vEligibility;
    this.tUpdatedDate = details.tUpdatedDate;
};

// POST 

Details.create = (newdetails, result) => {
    sql.query("INSERT INTO hackathon SET ?", newdetails, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { abId: res.insertabId, ...newdetails });
        result(null, { abId: res.insertabId, ...newdetails });
    });
};


// GET by ID

Details.findById = (hId, result) => {
    sql.query(`SELECT * FROM hackathon WHERE hId = ${hId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found details: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

//GET All

Details.getAll = (result) => {
    let query = "SELECT * FROM hackathon";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("details: ", res);
        result(null, res);
    });
};

// DELET

Details.remove = (hId, result) => {
    sql.query(`DELETE  FROM hackathon WHERE hId = ${hId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted description with Id: ", hId);
        result(null, res);
    });
};

module.exports = Details;
