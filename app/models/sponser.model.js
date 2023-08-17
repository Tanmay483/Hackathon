const sql = require('../config/db');
const sendmail = require('../middleware/sponsor.sendPassword.template')

// constructor
const Sponser = function (sponser) {

    this.companyName = sponser.companyName;
    this.personName = sponser.personName;
    this.contactNumber = sponser.contactNumber;
    this.Email = sponser.Email;
    this.image = sponser.image;
    this.UserName = sponser.UserName
    this.Password = sponser.Password
};

// POST 
Sponser.create = (sponsor, result) => {
    const { Email, UserName } = sponsor;

    // Check if UserName is already in use
    sql.query(`SELECT * FROM sponsor WHERE UserName = '${UserName}'`, (errUserName, resUserName) => {
        if (errUserName) {
            console.log("error: ", errUserName);
            result(errUserName, null);
            return;
        }

        if (resUserName.length > 0) {
            console.log("Username is already in use");
            result("Username is already in use", null);
            return;
        }
        // Check if Email is already in use
        sql.query(`SELECT * FROM sponsor WHERE Email = '${Email}'`, (errEmail, resEmail) => {
            if (errEmail) {
                console.log("error: ", errEmail);
                result(errEmail, null);
                return;
            }

            if (resEmail.length > 0) {
                console.log("Email is already in use");
                result("Email is already in use", null);
                return;
            }
            var password = getPassword();
            console.log("Generated password: ", password);

            sponsor.password = password;
            const data = {
                companyName: sponsor.companyName,
                personName: sponsor.personName,
                contactNumber: sponsor.contactNumber,
                Email: sponsor.Email,
                image: sponsor.image,
                UserName: sponsor.UserName,
                Password: password
            }
            sql.query("INSERT INTO sponsor SET ?", data, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created sponsor: ", { compId: res.insertId, ...sponsor });
                result(null, { compId: res.insertId, ...sponsor });
                // send mail
                sendmail(sponsor.Email, sponsor.password);
            });

        })
    })
};

//password genrator
function getPassword() {
    var length = 8,
        charset = "!@#$%&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

//GET All
Sponser.getAll = (result) => {
    let query = "SELECT * FROM sponsor";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("sponsor: ", res);
        result(null, res);
    });
};

// DELET
Sponser.remove = (compId, result) => {
    sql.query(`DELETE  FROM sponsor WHERE compId = ${compId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted sponser with Id: ", compId);
        result(null, res);
    });
};

//update
Sponser.update = (compId, sponsor, result) => {
    let query = `UPDATE sponsor SET companyName=?,personName=?,contactNumber=?,Email=?`
    const queryParams = [
        sponsor.companyName,
        sponsor.personName,
        sponsor.contactNumber,
        sponsor.Email
    ]


    if (sponsor.image) {
        query += ", image=?";
        queryParams.push(sponsor.image);
    }
    query += " WHERE compId = ?";
    queryParams.push(compId);

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if (res.affectedRows == 0) {
            result("data not found with id " + compId)
        }
        else {
            console.log("Data Updated Scessfully", { compId: compId, res })
            result(null, "Data Updated Scessfully", { compId: compId, res })
        }
    })

}

// login
Sponser.login = (UserName, Password, result) => {
    let query = `SELECT * FROM sponsor WHERE BINARY UserName = '${UserName}' AND BINARY Password = '${Password}'`
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Login successful");
            result(null, res);
        } else {
            console.log("Invalid username or Password");
            result("Invalid username or password", null);
        }
    });
};

module.exports = Sponser;