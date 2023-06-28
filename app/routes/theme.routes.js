const verifyToken = require('../controller/jwt')
const conn = require('../config/db');
module.exports = app => {
    const Theme = require('../controller/theme.controller');

    var router = require("express").Router();

    // Create a new Theme
    router.post("/addTheme", verifyToken, Theme.create);

    // Retrieve all Theme
    router.get("/", verifyToken, Theme.findAll);

    //retrieve problemstatement by id
    router.get("/:theId", verifyToken, Theme.findId)

    //update problem statement
    router.put('/update/:theId', verifyToken, (req, res) => {
        let theId = req.params.theId
        const vTheme = req.body.vTheme;
        const keyStatus = req.body.keyStatus;

        var sql = "UPDATE `hackathontheme` SET `vTheme`='" + vTheme + "',`keyStatus`='" + keyStatus + "' WHERE `theId` = '" + theId + "' ";

        conn.query(sql, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    data: req.body,
                    message: "Database update failed"
                });
            } else {
                console.log("Theme changed successfully");
                console.log(req.body);
                res.json({
                    success: true,
                    data: req.body,
                    message: "Database updated successfully"
                });
            }
        })
    })

    app.use('/app/theme', router);
};