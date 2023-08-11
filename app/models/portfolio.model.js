const sql = require('../config/db');

// constructor
const Portfolio = function (portfolio) {

    this.sId = portfolio.sId;
    this.Linkdin = portfolio.Linkdin;
    this.Behance = portfolio.Behance;
    this.Facebook = portfolio.Facebook;
    this.Instagram = portfolio.Instagram;
    this.Twitter = portfolio.Twitter;
    this.Git = portfolio.Git;
    this.Reddit = portfolio.Reddit;
    this.Figma = portfolio.Figma;
    this.Blogger = portfolio.Blogger;
    this.Website = portfolio.Website;
    this.Other = portfolio.Other;
};

// POST 


Portfolio.create = (portfolio, result) => {
    sql.query("INSERT INTO portfolio SET ?", portfolio, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created =tab: ", { pId: res.inserttabId, ...portfolio });
        result(null, { pId: res.inserttabId, ...portfolio });
    });
};

//GET All

Portfolio.getAll = (result) => {
    let query = "SELECT * FROM portfolio";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("portfolio: ", res);
        result(null, res);
    });
};

// get by ID
Portfolio.findData = (pId, result) => {
    sql.query(`SELECT * FROM portfolio WHERE pId = ${pId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("portfolio: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


// delete problemStatement

Portfolio.remove = (pId, result) => {
    sql.query(`DELETE  FROM portfolio WHERE pId = ${pId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted portfolio with Id: ", pId);
        result(null, res);
    });
};

// update tab
Portfolio.Update = (pId, portfolio, result) => {
    let query = `UPDATE portfolio SET `
    const queryParams = []

    if (portfolio.sId) {
        query += "sId=?, ";
        queryParams.push(portfolio.sId);
    }
    if (portfolio.Linkdin) {
        query += "Linkdin=?, ";
        queryParams.push(portfolio.Linkdin);
    }
    if (portfolio.Behance) {
        query += "Behance=?, ";
        queryParams.push(portfolio.Behance);
    }
    if (portfolio.Facebook) {
        query += "Facebook=?, ";
        queryParams.push(portfolio.Facebook);
    }
    if (portfolio.Instagram) {
        query += "Instagram=?, ";
        queryParams.push(portfolio.Instagram);
    }
    if (portfolio.Twitter) {
        query += "Twitter=?, ";
        queryParams.push(portfolio.Twitter);
    }
    if (portfolio.Git) {
        query += "Git=?, ";
        queryParams.push(portfolio.Git);
    }
    if (portfolio.Reddit) {
        query += "Reddit=?, ";
        queryParams.push(portfolio.Reddit);
    }
    if (portfolio.Figma) {
        query += "Figma=?, ";
        queryParams.push(portfolio.Figma);
    }
    if (portfolio.Blogger) {
        query += "Blogger=?, ";
        queryParams.push(portfolio.Blogger);
    }
    if (portfolio.Website) {
        query += "Website=?, ";
        queryParams.push(portfolio.Website);
    }
    if (portfolio.Other) {
        query += "Other=?, ";
        queryParams.push(portfolio.Other);
    }
    console.log(query);
    // Remove the trailing comma and space if any fields were provided
    if (queryParams.length > 0) {
        query = query.slice(0, -2);
    }

    query += " WHERE pId = ?";
    queryParams.push(pId);

    sql.query(query, queryParams,
        (err, data) => {
            if (err) {
                result.json({
                    success: false,
                    message: "Database update failed"
                });
            } else {
                console.log("Portfolio change successfully");
                result(null, "Portfolio change successfully")
            }

        });
}
module.exports = Portfolio;
