const multer = require('../documentController/document.control');
const conn = require('../config/db');
const verifyToken = require('../controller/jwt')

module.exports = (app) => {
  const registration = require('../controller/registration.controller');

  var router = require('express').Router();

  // Create a new blog
  router.post('/', multer, verifyToken, registration.create);

  // Update a registration with id
  router.put('/:Id', multer, verifyToken, (req, res) => {
    let Id = req.params.Id;
    const vName = req.body.vName;
    const vMobileNumber = req.body.vMobileNumber;
    const vGitUrl = req.body.vGitUrl;
    const vAddress = req.body.vAddress;
    const vQualification = req.body.vQualification;
    const vProfession = req.body.vProfession;
    const vTeamType = req.body.vTeamType;
    const iNumberOfMembers = req.body.iNumberOfMembers;
    const vProblemStatement = '';
    const Document = req.file ? req.file.path.replace(/\\/g, '/') : null; // Check if file is provided
  
    let sql = "UPDATE `student` SET `vName`='" + vName + "', `vMobileNumber`= '" + vMobileNumber + "', `vGitUrl`='" + vGitUrl + "', `vAddress`='" + vAddress + "', `vQualification`='" + vQualification + "', `vProfession`='" + vProfession + "', `vTeamType`='" + vTeamType + "', `iNumberOfMembers`='" + iNumberOfMembers + "', `vProblemStatement`='" + vProblemStatement + "'";
  
    if (Document) {
      sql += ", `Document`='" + Document + "'";
    }
  
    sql += " WHERE Id = '" + Id + "'";
  
    conn.query(sql, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: req.body,
          message: "Database update failed"
        });
      } else {
        console.log("Registration changed successfully");
        console.log(req.body);
        res.json({
          success: true,
          data: req.body,
          message: "Database updated successfully"
        });
      }
    });
  });
  
  // Update a status with id
  router.put('/active/:Id', verifyToken, (req, res) => {
    let Id = req.params.Id;
    const keyStatus = req.body.keyStatus


    var sql = "UPDATE `student` SET `keyStatus`='" + keyStatus + "' WHERE  Id = '" + Id + "' "
    conn.query(sql, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: req.body,
          message: "Database update failed"
        });
      } else {
        console.log("status change sucessfully");
        console.log(req.body);
        res.json({
          success: true,
          data: req.body,
          message: "status change sucessfully"
        });
      }

    });
  });

  // update git url

  router.put('/giturl/:Id', verifyToken, (req, res) => {
    let Id = req.params.Id;
    const vGitUrl = req.body.vGitUrl


    var sql = "UPDATE `student` SET `vGitUrl`='" + vGitUrl + "' WHERE  Id = '" + Id + "' "
    conn.query(sql, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: req.body,
          message: "can't enter url"
        });
      } else {
        console.log("URL Update scessfull");
        console.log(req.body);
        res.json({
          success: true,
          data: req.body,
          message: "URL Update scessfull"
        });
      }

    });
  });

  // update ranking
  router.put('/ranking/:Id', verifyToken, (req, res) => {
    let Id = req.params.Id;
    const iRanking = req.body.iRanking

    // update git url

    var sql = "UPDATE `student` SET `iRanking`='" + iRanking + "' WHERE  Id = '" + Id + "' "
    conn.query(sql, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: req.body,
          message: "Ranking fail"
        });
      } else {
        console.log("Rank Update scessfull");
        console.log(req.body);
        res.json({
          success: true,
          data: req.body,
          message: "Rank Update scessfull"
        });
      }

    });
  });

  // Retrieve all registration
  router.get('/', verifyToken, registration.findAll);

  // Retrieve registration by id
  router.get('/Id/:Id', verifyToken, registration.findId);

  app.use('/app/registration', router);
};