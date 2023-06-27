const verifyToken = require('../controller/jwt')
const conn = require('../config/db');
module.exports = app => {
    const problemStatement = require('../controller/problemStatement.controller');

    var router = require("express").Router();

    // Create a new problemStatement
    router.post("/", verifyToken, problemStatement.create);

    // Retrieve all problemStatement
    router.get("/", verifyToken, problemStatement.findAll);

    //retrieve problemstatement by id
    router.get("/:pId", verifyToken, problemStatement.findId)

    //update problem statement
    router.put('/update/:pId', verifyToken, (req, res) => {
        let pId = req.params.pId
        const hId = req.body.hId;
        const theId = req.body.theId;
        const vProblemStatement = req.body.vProblemStatement;

        var sql = "UPDATE `ptoblemstatement` SET `hId`='" + hId + "',`theId`='" + theId + "', `vProblemStatement`='" + vProblemStatement + "' WHERE `pId` = '" + pId + "' ";

        conn.query(sql, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    data: req.body,
                    message: "Database update failed"
                });
            } else {
                console.log("problemStatement changed successfully");
                console.log(req.body);
                res.json({
                    success: true,
                    data: req.body,
                    message: "Database updated successfully"
                });
            }
        })
    })

    router.delete('/delete/:pId', verifyToken , problemStatement.delete)

    app.use('/app/problemStatement', router);
};