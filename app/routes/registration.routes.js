const multer = require('../documentController/document.control');
const verifyToken = require('../controller/jwt');
const conn = require('../config/db');

module.exports = (app) => {
  const registration = require('../controller/registration.controller');

  var router = require('express').Router();

  // Create a new blog
  router.post('/', multer,verifyToken, registration.create);

  // Update a registration with id
  router.put('/:Id', multer, verifyToken,(req, res) => {
    let Id = req.params.Id
        const vName = req.body.vName
        const vMobileNumber  = req.body.vMobileNumber;
        const vGitUrl  = req.body.vGitUrl;
        const vAddress = req.body.vAddress;
        const vQualification = req.body.vQualification;
        const vProfession = req.body.vProfession;
        const vTeamType  = req.body.tCreatedDate; 
        const iNumberOfMembers = req.body.tUpdatedDate;
        const vProblemStatement = req.body.tUpdatedDate;
        const Document = req.file.filename;
        
        var sql = "UPDATE `student` SET `vName`='" + vName + "',`vMobileNumber`= '" + vMobileNumber + "',`vGitUrl`='"+vGitUrl+"',`vAddress`='" + vAddress + "',`vQualification`='"+vQualification+"',`vProfession`='"+vProfession+"',`vTeamType`='" + vTeamType + "',`iNumberOfMembers` = '"+iNumberOfMembers+"',`vProblemStatement` = '"+vProblemStatement+"',`Document` = '"+Document+"'WHERE  Id = '" + Id + "' "
        conn.query(sql, (err, data) => {
            if (err) throw err;
            console.log("registration change sucessfully")
            console.log(req.body)
        });
        res.send("registration change sucessfully")
  });

  // Update a status with id
  router.put('/active/:Id',verifyToken, (req, res) => {
    let Id = req.params.Id;
        const keyStatus = req.body.keyStatus
     
        
        var sql = "UPDATE `student` SET `keyStatus`='" + keyStatus + "' WHERE  Id = '" + Id + "' "
        conn.query(sql, (err, data) => {
            if (err) throw err;
            console.log("blog change sucessfully")
            console.log(req.body)
        });
        res.send("status change sucessfully")
  });

  // Retrieve all registration
  router.get('/',verifyToken, registration.findAll);

  // Retrieve registration by id
  router.get('/Id/:Id',verifyToken, registration.findId);

  app.use('/app/registration', router);
};