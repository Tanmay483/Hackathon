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
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Contact."
      });
    else res.send(data);
  });
};

// GET all  

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Contact.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving description."
        });
      else res.send(data);
    });
  };

