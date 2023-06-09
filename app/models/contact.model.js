const sql = require('../config/db');

// constructor
const Contact = function (contact) {

    this.vFullName = contact.vFullName;
    this.vEmail = contact.vEmail;
    this.vMobileNumber = contact.vMobileNumber;
    this.vAddress = contact.vAddress;
};

// POST 

Contact.create = (newcontact, result) => {
    sql.query("INSERT INTO contact SET ?", newcontact, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created contact: ", { cId: res.insertcId, ...newcontact });
        result(null, { cId: res.insertcId, ...newcontact });
    });
};

//GET All

Contact.getAll = (title, result) => {
    let query = "SELECT * FROM contact";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("description: ", res);
        result(null, res);
    });
};

module.exports = Contact;
