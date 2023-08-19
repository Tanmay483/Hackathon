const sql = require('../config/db');

// constructor

const Type = function (type) {
  this.vType = type.vType;
  this.iParentId = type.iParentId;
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
Type.findData = (tId, result) => {
  sql.query(`SELECT * FROM type WHERE tId = ${tId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("types: ", res);
      result(null, res[0]);
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

// insert
Type.create = (type, result) => {
  sql.query("INSERT INTO type SET ?", type, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("created ad: ", { tId: res.insertId, ...type });
      result(null, { tId: res.insertId, ...type });
  });
};

//update
Type.update = (tId, type, result) => {
  let query = `UPDATE type SET vType=?,iParentId=? WHERE tId = ?`
  const queryParams = [
      type.vType,
      type.iParentId,
      tId
  ]

  sql.query(query, queryParams, (err, res) => {
      if (err) {
          throw err
      }
      if (res.affectedRows == 0) {
          result("data not found with id " + tId)
      }
      else {
          console.log("Data Updated Scessfully", { tId: tId, res })
          result(null, "Data Updated Scessfully", { tId: tId, res })
      }
  })

}

// delete
Type.remove = (tId, result) => {
  sql.query(`DELETE  FROM type WHERE tId = ${tId}`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
      }

      console.log("deleted ad with Id: ", tId);
      result(null, res);
  });
};


module.exports = Type