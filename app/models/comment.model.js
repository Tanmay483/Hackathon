const sql = require('../config/db');

// constructor
const Comment = function (comment) {

    this.hId = comment.hId;
    this.Id	 = comment.Id	;
    this.vcomment = comment.vcomment;
};

// POST 

Comment.create = (newcomment, result) => {
    sql.query("INSERT INTO comment SET ?", newcomment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { comId: res.insertcomId, ...newcomment });
        result(null, { comId: res.insertcomId, ...newcomment });
    });
};

//GET All

Comment.getAll = (title, result) => {
    let query = "SELECT * FROM comment";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("comments: ", res);
        result(null, res);
    });
};

module.exports = Comment;
