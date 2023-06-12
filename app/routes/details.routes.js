const upload = require('../documentController/image.controller')
const conn = require('../config/db');
const verifyToken = require('../controller/jwt')


module.exports = app => {
    const Description = require('../controller/details.controller');

    var router = require("express").Router();

    // Create a new Description
    router.post("/", upload,verifyToken, Description.create);

    // Retrieve all Description
    router.get("/",verifyToken,Description.findAll);

    // Retrieve a single Description with id
    router.get("/:hId", verifyToken,Description.findOne);

    // Retrieve a single Description with id
    router.get("/brif/:hId", verifyToken,Description.brif);


    router.put('/:hId', upload,verifyToken, (req, res) => {
        let hId = req.params.hId
        const vTitle = req.body.vTitle;
        const vImage = "http://localhost:8085/" + req.file.path.replace(/\\/g, '/');
        const vUniversity = req.body.vUniversity;
        const vAddress = req.body.vAddress;
        const vBrif	 = req.body.vBrif	;
        const vDetails = req.body.vDetails;
        const vDeadline = req.body.vDeadline;
        const iTeamSize	= req.body.iTeamSize;
        const vEligibility = req.body.vEligibility;
        const tCreatedDate = req.body.tCreatedDate;
        const tUpdatedDate = req.body.tUpdatedDate;

        var sql = "UPDATE `hackathon` SET `vTitle`='" + vTitle + "',`vImage`='" + vImage + "', `vUniversity`='" + vUniversity + "',`vAddress`='"+vAddress+"',`vBrif`='"+vBrif+"',`vDetails`='"+vDetails+"',`vDeadline`='"+vDeadline	+"',`iTeamSize`='"+iTeamSize+"',`vEligibility`='"+vEligibility+"',`tCreatedDate`='" + tCreatedDate + "',`tUpdatedDate`='" + tUpdatedDate + "' WHERE `hId` = '" + hId + "' ";
        
        conn.query(sql, (err, data) => {
            if (err) throw err;
            console.log('details cahnge scessfully')
        })
        res.send("details cahnge scessfully")
    })

    

    // Delete a Description with id
    router.delete("/:hId", Description.delete);

    app.use('/app/hackathon', router);
};

