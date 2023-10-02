const sql = require('../config/db');
const jwt = require('jsonwebtoken')



// constructor
const Admin = function (admin) {
    this.username = admin.username,
    this.password = admin.password
}

//insert
Admin.create = (admin, result) => {
    sql.query("INSERT INTO tbl_admin SET ?", admin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { adminId: res.insertId, ...admin });
    });
};

//GET All
Admin.getAll = (result) => {
    let query = "SELECT * FROM tbl_admin";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("admin: ", res);
        result(null, res);
    });
};

// DELET
Admin.remove = (adminId, result) => {
    sql.query(`DELETE  FROM tbl_admin WHERE adminId = ${adminId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ad with Id: ", adminId);
        result(null, res);
    });
};

//update
Admin.update = (adminId, admin, result) => {
    let query = `UPDATE tbl_admin SET username=? , password=? WHERE adminId = ?`
    const queryParams = [
        admin.username,
        admin.password,
        adminId
    ]

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if (res.affectedRows == 0) {
            result("data not found with id " + adminId)
        }
        else {
            console.log("Data Updated Scessfully", { adminId: adminId, res })
            result(null, "Data Updated Scessfully", { adminId: adminId, res })
        }
    })

}

//login

Admin.Login = (admin, res) => {
    let query1 = `SELECT * FROM tbl_admin WHERE username = "${admin.username}" AND password = "${admin.password}"`;
    sql.query(query1, (err, resp) => {
        if (err) {
            res.json({
                success: false,
                message: "Database error",
                error: err
            });
        } else if (resp.length > 0) {
            // Admin login successful
            const adminTokenPayload = {
                isAdmin: true, // Add an isAdmin flag to identify admin tokens
                user: {} // You can add more admin-related information here if needed
            };
            jwt.sign(adminTokenPayload, process.env.ADMIN_JWT_SECRET_KEY, {}, (err, token) => {
                if (err) {
                    res.status(500).json({ error: "Failed to generate admin token" });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Admin login successful",
                        token: token
                    });
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }
    });
};

module.exports = Admin