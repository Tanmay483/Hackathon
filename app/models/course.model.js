const sql = require('../config/db');

// constructor
const Course = function (course) {

    this.vName = course.vName;
    this.tId = course.tId;
};

// POST 

Course.create = (course, result) => {
    sql.query("INSERT INTO course SET ?", course, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created =tab: ", { pId: res.inserttabId, ...course });
        result(null, { pId: res.inserttabId, ...course });
    });
};

//GET All

Course.getAll = (result) => {
    let query = "SELECT * FROM course";

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
Course.findData = (courseId, result) => {
    sql.query(`SELECT * FROM course WHERE courseId = ${courseId}`, (err, res) => {
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

Course.remove = (courseId, result) => {
    sql.query(`DELETE  FROM course WHERE courseId = ${courseId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted portfolio with Id: ", courseId);
        result(null, res);
    });
};

// update tab
Course.Update = (courseId, course, result) => {
    let query = `UPDATE course SET vName =?,tId=? WHERE courseId = ?`

    sql.query(query, [course.vName, course.tId, courseId], (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database update failed"
            });
        } else {
            console.log("Course change successfully");
            result(null, "Course change successfully")
        }

    });
}

// get domain and course

Course.domain = (tId, res) => {
    let query1 = `SELECT * FROM type WHERE tId = ${tId} && iParentId != 0 `;
    sql.query(query1, (err, result1) => {
        if (err) {
            console.error('Error executing query1:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        // query2 
        let query2 = `SELECT * FROM course WHERE tId = ${tId}`;
        sql.query(query2, (err, result2) => {
            if (err) {
                console.error('Error executing query2:', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }

            const combineResult = {
                domain: result1[0],
                course: result2,
            };

            res.json(combineResult);
        });
    });
};

module.exports = Course;