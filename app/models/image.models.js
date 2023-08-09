const sql = require('../config/db');

// constructor
const Images = function (details) {
    this.image = details.image;
};

// only image
Images.image = (details, result) => {
    sql.query("INSERT INTO onlyimage SET ?", details, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { ID: res.insertID, ...details });
        result(null, { ID: res.insertID, ...details });
    });
};


module.exports = Images;
