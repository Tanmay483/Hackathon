const sql = require('../config/db');

// constructor
const Details = function (details) {

    this.vTitle = details.vTitle;
    this.vImage = details.vImage;
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

        console.log("created tutorial: ", { hId: res.inserthId, ...newdetails });
        result(null, { hId: res.inserthId, ...newdetails });
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
        if (res.length === 0) {
            console.log('data not found');
            result('error', null);
            return;
        }
        const hackathon = res[0];

        sql.query(
            `SELECT comId, Id, vcomment FROM comment WHERE hId = ${hId}`,
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                    return;
                }

                const comment = res.length > 0 ? res : [];

                const resultData = {
                    hackathon: hackathon,
                    comment: comment,
                    tab: {
                        vBrif: hackathon.vBrif,
                        vDetails: hackathon.vDetails
                    }
                };

                console.log('found hackathon:', resultData);
                result(null, resultData);
            }
        );
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


// tab

Details.ById = (hId, result) => {
    sql.query(`SELECT * FROM hackathon WHERE hId = ${hId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            console.log('data not found');
            result('error', null);
            return;
        }
        const hackathon = res[0]

        sql.query(
            `SELECT vBrif,vDetails FROM hackathon WHERE hId = ${hId}`,
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                    return;
                }

                const brif = res.length > 0 ? res : [];

                const resultData = {
                    hackathon: hackathon,
                    tab: brif
                };

                console.log('found hackathon:', resultData);
                result(null, resultData);
            }
        );

    });
};

//update
Details.update = (hId, details, result) => {
    let query = `UPDATE hackathon SET vTitle=?,vUniversity=?,vAddress=?,vBrif=?,vDetails=?,vDeadline=?,iTeamSize=?,vEligibility=?,tCreatedDate=?,tUpdatedDate=?`
    const queryParams = [
        details.vTitle,
        details.vUniversity,
        details.vAddress,
        details.vBrif,
        details.vDetails,
        details.vDeadline,
        details.iTeamSize,
        details.vEligibility,
        details.tCreatedDate,
        details.tUpdatedDate,
    ]


    if (details.vImage) {
        query += ", vImage=?";
        queryParams.push(details.vImage);
    }
    query += " WHERE hId = ?";
    queryParams.push(hId);



    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if(res.affectedRows == 0){
            result("data not found with id " + hId)
        }
        else {
            console.log("Data Updated Scessfully", { hId: hId, res })
            result(null, "Data Updated Scessfully", { hId: hId, res })
        }
    })

}

// only image
Details.image = (details, result) => {
    sql.query("INSERT INTO hackathon SET ?", details, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { hId: res.inserthId, ...details });
        result(null, { hId: res.inserthId, ...details });
    });
};


module.exports = Details;
