const sql = require('../config/db');

// constructor
const Details = function (details) {

    this.vTitle = details.vTitle;
    this.vImage =  details.vImage;
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

        console.log("created tutorial: ", { abId: res.inserthId, ...newdetails });
        result(null, { abId: res.inserthId, ...newdetails });
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
    let query = `UPDATE hackathon SET vTitle=?,vImage=?,vUniversity=?,vAddress=?,vBrif=?,vDetails=?,vDeadline=?,iTeamSize=?,vEligibility=?,tCreatedDate=?,tUpdatedDate=? WHERE hId = ?`
    sql.query(query,[details.vTitle,details.vImage,details.vUniversity,details.vAddress,details.vBrif,details.vDetails,details.vDeadline,details.iTeamSize,details.vEligibility,details.tCreatedDate,details.tUpdatedDate,hId],(err,res)=>{
        if(err){
            throw err
        }
        else{
            console.log("Data Updated Scessfully",{hId: hId, details})
            result(null,"Data Updated Scessfully",{hId: hId, details})
        }
    })

}


module.exports = Details;
