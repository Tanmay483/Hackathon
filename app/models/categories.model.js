const sql = require('../config/db');

// constructor
const Categories = function (categories) {

    this.vcatagoryName = categories.vcatagoryName;
    this.iParentId = categories.iParentId;
};

// POST 

Categories.create = (categories, result) => {
    sql.query("INSERT INTO categories SET ?", categories, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created categories: ", { catId: res.insertId, ...categories });
        result(null, { catId: res.insertId, ...categories });
    });
};

//GET All

Categories.getAll = (result) => {
    let query = "SELECT * FROM categories";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("categories: ", res);
        result(null, res);
    });
};

// get by ID
Categories.findData = (catId, result) => {
    sql.query(`SELECT * FROM categories WHERE catId = ${catId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("categories: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


// delete problemStatement

Categories.remove = (catId, result) => {
    sql.query(`DELETE  FROM categories WHERE catId = ${catId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted categories with Id: ", catId);
        result(null, res);
    });
};

// update 
Categories.Update = (catId, categories, result) => {
    let query = `UPDATE categories SET vcatagoryName =?,iParentId=? WHERE catId = ?`

    sql.query(query, [categories.vcatagoryName, categories.iParentId,catId], (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Database update failed"
            });
        } else {
            console.log("Categories change successfully");
            result(null, "Categories change successfully")
        }

    });
}

// get categories and suncategories

Categories.subCategories = (catId, result) => {
    sql.query(
      `SELECT * FROM categories WHERE catId = ${catId}`,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }
        if (res.length === 0) {
          console.log('data not found');
          result('error', null);
          return;
        }
  
        const categories = res[0];
  
        sql.query(
          `SELECT * FROM categories WHERE iParentId = ${catId}`,
          (err, res) => {
            if (err) {
              console.log('Error:', err);
              result(err, null);
              return;
            }
  
            const subCategories = res.length > 0 ? res : [];
  
            const resultData = {
              categories: categories,
              subCategories: subCategories
            };
  
            console.log('found categories:', resultData);
            result(null, resultData);
          }
        );
      }
    );
  };
  
  

module.exports = Categories;