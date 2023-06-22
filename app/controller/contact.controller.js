const Contact = require('../models/contact.model');


// Create and Save a new Description
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Description
  const contact = new Contact({
    vFullName	:req.body.vFullName,
    vEmail: req.body.vEmail,
    vMobileNumber: req.body.vMobileNumber,
    vAddress:req.body.vAddress,
  });

//   POST

Contact.create(contact, (err, data) => {
  if (err) {
    res.status(400).json({
      success: false,
      message: "contact failed"
    });
  } else {
    console.log("contact submited successfully");
    console.log(req.body);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "Thankyou for contact us"
    });
  }
  });
};

// GET all  

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Contact.getAll(title, (err, data) => {
      if (err) {
        res.status(400).json({ 
          success: false,
          message: "can not get contact list"
        });
      } else {
        console.log("contact");
        console.log(req.body);
        res.status(200).json({
          success: true,
          data: data,
          message: "contacts"
        });
      }
    });
  };

