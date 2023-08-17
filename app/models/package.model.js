const sql = require('../config/db');

// constructor
const Package = function (package) {

    this.Name = package.Name;
    this.Description = package.Description;
    this.Price = package.Price;
    this.Features = package.Features;
};

// POST 
Package.create = (package, result) => {
    sql.query("INSERT INTO package SET ?", package, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created package: ", { pacId: res.insertId, ...package });
        result(null, { adId: res.insertId, ...package });
    });
};


//GET All
Package.getAll = (result) => {
    let query = "SELECT * FROM package";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("package: ", res);
        result(null, res);
    });
};

// DELET
Package.remove = (pacId, result) => {
    sql.query(`DELETE  FROM package WHERE pacId  = ${pacId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ad with Id: ", pacId);
        result(null, res);
    });
};

//update
Package.update = (pacId, package, result) => {
    let query = `UPDATE package SET Name=?,Description=?,Price=?,Features =? WHERE pacId =?`
    const queryParams = [
        package.Name,
        package.Description,
        package.Price,
        package.Features,
        pacId
    ]

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if (res.affectedRows == 0) {
            result("data not found with id " + pacId)
        }
        else {
            console.log("Data Updated Scessfully", { pacId: pacId, res })
            result(null, "Data Updated Scessfully", { pacId: pacId, res })
        }
    })

}

// get by id
Package.findById = (pacId, result) => {
    sql.query(`SELECT * FROM package WHERE pacId = ${pacId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
module.exports = Package;