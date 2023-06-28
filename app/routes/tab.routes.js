const verifyToken = require('../controller/jwt')
const conn = require('../config/db');
module.exports = app => {
    const Tab = require('../controller/tab.controller');

    var router = require("express").Router();

    // Create a new Tab
    router.post("/", verifyToken, Tab.create);

    // Retrieve all Tab
    router.get("/", verifyToken, Tab.findAll);

    //retrieve problemstatement by id
    router.get("/:tabId", verifyToken, Tab.findId)

    //update problem statement
    router.put('/update/:tabId', verifyToken, (req, res) => {
        let tabId = req.params.tabId
        const hId = req.body.hId;
        const vTitle = req.body.vTitle;
        const vDiscription = req.body.vDiscription;
        const tCreatedDate = req.body.tCreatedDate;
        const tUpdatedDate = req.body.tUpdatedDate;

        var sql = "UPDATE `tab` SET `hId`='" + hId + "',`vTitle`='" + vTitle + "', `vDiscription`='" + vDiscription + "', `tCreatedDate`='" + tCreatedDate + "', `tUpdatedDate`='" + tUpdatedDate + "' WHERE `tabId` = '" + tabId + "' ";

        conn.query(sql, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    // data: req.body,
                    message: "Database update failed"
                });
            } else {
                console.log("tab details changed successfully");
                console.log(req.body);
                res.json({
                    success: true,
                    data: req.body,
                    message: "Database updated successfully"
                });
            }
        })
    })

    router.delete('/delete/:tabId', verifyToken , Tab.delete)

    app.use('/app/tab', router);
};