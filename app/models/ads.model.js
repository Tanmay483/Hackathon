const sql = require('../config/db');

// constructor
const Ads = function (ads) {

    this.vTitle = ads.vTitle;
    this.image  = ads.image ;
    this.tCreatedDate = ads.tCreatedDate;
};

// POST 
Ads.create = (newads, result) => {
    sql.query("INSERT INTO ads SET ?", newads, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ad: ", { adId: res.insertId, ...newads });
        result(null, { adId: res.insertId, ...newads });
    });
};


//GET All
Ads.getAll = (result) => {
    let query = "SELECT * FROM ads";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ads: ", res);
        result(null, res);
    });
};

// DELET
Ads.remove = (adId, result) => {
    sql.query(`DELETE  FROM ads WHERE adId = ${adId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ad with Id: ", adId);
        result(null, res);
    });
};

// update
Ads.update = (adId, ads, result) => {
    let query = `UPDATE ads SET vTitle=?,tCreatedDate=?`
    const queryParams = [
        ads.vTitle,
        ads.tCreatedDate,
    ]


    if (ads.image) {
        query += ", image=?";
        queryParams.push(ads.image);
    }
    query += " WHERE adId = ?";
    queryParams.push(adId);

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if (res.affectedRows == 0) {
            result("data not found with id " + adId)
        }
        else {
            console.log("Data Updated Scessfully", { adId: adId, res })
            result(null, "Data Updated Scessfully", { adId: adId, res })
        }
    })

}

module.exports = Ads;