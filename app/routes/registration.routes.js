const multer = require('../documentController/document.control')
const conn = require('../config/db')
module.exports = app => {
    const registration = require('../controller/registration.controller');
  
    var router = require("express").Router();
  
    // Create a new blog
    router.post("/",multer,registration.create);
  
    // Retrieve all registration
    router.get("/", registration.findAll);

    //Retrive registration by id
    router.get("/Id/:Id",registration.findId)
  
    // Update a registration with id
    router.put("/:Id", multer, (req, res) => {

        let Id = req.params.Id
        const vName = req.body.vName
        const vEmail = req.body.vEmail;
        const vMobileNumber	 = req.body.vMobileNumber	;
        const vAddress = req.body.vAddress;
        const vQualification = req.body.vQualification;
        const vProfession = req.body.vProfession;
        const vTeamType	 = req.body.tCreatedDate; 
        const iNumberOfMembers = req.body.tUpdatedDate;
        const vProblemStatement = req.body.tUpdatedDate;
        const Document = req.file.filename;
        
        var sql = "UPDATE `student` SET `vName`='" + vName + "',`vEmail`='" + vEmail + "',`vMobileNumber`= '" + vMobileNumber + "',`vAddress`='" + vAddress + "',`vQualification`='"+vQualification+"',`vProfession`='"+vProfession+"',`vTeamType`='" + vTeamType + "',`iNumberOfMembers` = '"+iNumberOfMembers+"',`vProblemStatement` = '"+vProblemStatement+"',`Document` = '"+Document+"'WHERE  Id = '" + Id + "' "
        conn.query(sql, (err, data) => {
            if (err) throw err;
            console.log("blog change sucessfully")
            console.log(req.body)
        });
        res.send("blog change sucessfully")
    })
  
    // Delete a registration with id
    router.delete("/:bId", registration.delete);


    app.use('/app/registration', router);
};