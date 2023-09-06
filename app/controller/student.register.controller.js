const Registration = require('../models/student.register.model');
const upload = require('../documentController/document.control')

// Create and Save
exports.create = (req, res) => {
  const defaultValues = {
    vName: '',
    vUserName:'',
    vUserName: '',
    vEmail: '',
    vMobileNumber: '',
    vGitUrl: '',
    vAddress: '',
    country: '',
    organization: '',
    vQualification: '',
    vProfession: '',
    vTeamType: '',
    iNumberOfMembers: 0,
    vProblemStatement: '',
    Document: req.file.path.replace(/\\/g, '/'),
    keyStatus: 0,
    iRanking: 0,
    vUniversity: '',
    gender: '',
    Termsandcondition: 0,
    subscibe: 0,
    sId: 0,
    hId: 0,
    iTeamId: "",
    tId: 0,
    domId: 0,
    themeId: 0,
    domainId: 0,
    courseId: 0,
    CourseProgramme: 'full-time',
    YearofGraduation: 2020
  };

  const registration = { ...defaultValues, ...req.body };

  // Check if any required fields are missing
  if (!registration.vName || !registration.vEmail || !registration.vMobileNumber) {
    res.status(404).json({
      success: false,
      message: "Required fields vName, vEmail, vMobileNumber cannot be empty!"
    });
    return;
  }

  Registration.create(registration, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "Registration failed",
        Error: err
      });
    } else {

      res.status(201).json({
        success: true,
        data: data,
        message: "congratulation your entry has been register successfully"
      });
    }
  });
};