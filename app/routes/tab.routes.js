// const verifyToken = require('../controller/jwt')
const conn = require('../config/db');
module.exports = app => {
    const Tab = require('../controller/tab.controller');

    var router = require("express").Router();

    // Create a new Tab
    router.post("/", Tab.create);

    // Retrieve all Tab
    router.get("/", Tab.findAll);

    //retrieve problemstatement by id
    router.get("/:tabId", Tab.findId)

    //update problem statement
    router.put('/update/:tabId', (req, res) => {
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

    router.delete('/delete/:tabId' , Tab.delete)

    app.use('/api/tab', router);
};