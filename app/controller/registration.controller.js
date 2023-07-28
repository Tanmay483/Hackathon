const Registration = require('../models/registrstion.model');
const upload = require('../documentController/document.control')

// Create and Save
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const registration = new Registration({
    vName: req.body.vName,
    vEmail: req.body.vEmail,
    vMobileNumber: req.body.vMobileNumber,
    vGitUrl: req.body.vGitUrl,
    vAddress: req.body.vAddress,
    vQualification: req.body.vQualification,
    vProfession: req.body.vProfession,
    vTeamType: req.body.vTeamType,
    iNumberOfMembers: req.body.iNumberOfMembers,
    vProblemStatement: req.body.vProblemStatement,
    Document: req.file.filename,
    keyStatus: req.body.keyStatus,
    iRanking: req.body.iRanking,
    vUniversity: req.body.vUniversity,
    gender: req.body.gender
  });
  // POST

  Registration.create(registration, (err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Registration failed"
      });
    } else {
      console.log("Registration add successfully");
      console.log(req.body);
      const responseData = { Id: data.Id, ...req.body };
      res.status(200).json({
        success: true,
        data: responseData,
        message: "congratulation your entry has been register successfully"
      });
    }
  });
};

// get all

exports.findAll = (req, res) => {
  Registration.getAll((err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "can not get data"
      });
    } else {
      console.log("user detail");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "data"
      });
    }
  });
};

// get by id

exports.findId = (req, res) => {
  Registration.findId(req.params.Id, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "error retriving data with id " + req.params.Id + " Id not found "
      });
    } else {
      console.log("Registration changed successfully");
      console.log(req.body);
      res.status(200).json({
        success: true,
        data: data,
        message: "User with id:" + req.params.Id
      });
    }
  });
};

// status change
exports.status = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "please insert data" })
  }
  const registration = new Registration({
    keyStatus: req.body.keyStatus
  });
  Registration.status(req.params.Id, registration, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Error while change status"
      });
    }
    else {
      res.json({
        success: true,
        message: "status change sucessfully"
      });
    }
  })
}

// ranking update
exports.ranking = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "please insert data" })
  }
  const registration = new Registration({
    iRanking: req.body.iRanking
  });
  Registration.ranking(req.params.Id, registration, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Error while update database"
      });
    }
    else {
      res.json({
        success: true,
        message: "Ranking update successfully"
      });
    }
  })
}

// giturl update
exports.giturl = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "please insert data" })
  }
  const registration = new Registration({
    vGitUrl: req.body.vGitUrl
  });
  Registration.giturl(req.params.Id, registration, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Error while update database"
      });
    }
    else {
      res.json({
        success: true,
        message: "GitUrl update successfully"
      });
    }
  })
}

// update all data
exports.update = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading Document:", err);
      res.status(500).send({ message: "Failed to upload Document." });
      return;
    }

    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const updatedData = {
      vName: req.body.vName || '',
      vMobileNumber: req.body.vMobileNumber || '',
      vGitUrl: req.body.vGitUrl || '',
      vAddress: req.body.vAddress || '',
      vQualification: req.body.vQualification || '',
      vProfession: req.body.vProfession || '',
      vTeamType: req.body.vTeamType || '',
      iNumberOfMembers: req.body.iNumberOfMembers || '',
      vProblemStatement: req.body.vProblemStatement || '',
      Document: req.file ? req.file.filename : '',
      keyStatus: req.body.keyStatus || '',
      vUniversity: req.body.vUniversity || '',
    };

    Registration.update(req.params.Id, updatedData, (err, data) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send({ message: "Failed to update data." });
        return;
      } else {
        res.status(200).json({
          status: 1,
          message: "Token verify sucessfully",
          data: data
        });
      }
    });
  });
};
