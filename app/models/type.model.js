const sql = require('../config/db');

// constructor

const Type = function (type) {
  this.vType = type.vType;
  this.vParentId = type.vParentId;
  this.vOther = type.vOther;
};

// get all details

Type.getAll = (result) => {
  let query = "SELECT * FROM type";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("types: ", res);
    result(null, res);
  });
};

//GET type by id 

Type.findData = (iParentId, result) => {
  sql.query(`SELECT * FROM type WHERE iParentId = ${iParentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("types: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

// iParentId = 0

Type.findType = (result) => {
  let query = "SELECT * FROM type WHERE iParentId = 0";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("types: ", res);
    result(null, res);
  });
};

module.exports = Type