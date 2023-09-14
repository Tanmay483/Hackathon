const sql = require('../config/db');
const mail = require('../middleware/onlymail.middleware')

// constructor
const Template = function (template) {

    this.Template = template.Template;
    this.Type = template.Type;
    this.Title = template.Title;
};

// POST 
Template.create = (template, result) => {
    sql.query("INSERT INTO template SET ?", template, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { Id: res.insertId, ...template });
    });
};


//GET All
Template.getAll = (result) => {
    let query = "SELECT * FROM template";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("template: ", res);
        result(null, res);
    });
};

// DELET
Template.remove = (Id, result) => {
    sql.query(`DELETE  FROM template WHERE Id = ${Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted template with Id: ", Id);
        result(null, res);
    });
};

//update
Template.update = (Id, template, result) => {
    let query = `UPDATE template SET Template=?,Type=? , Title=? WHERE Id = ?`
    const queryParams = [
        template.Template,
        template.Type,
        template.Title,
        Id
    ]

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            throw err
        }
        if (res.affectedRows == 0) {
            result("data not found with id " + Id)
        }
        else {
            console.log("Data Updated Scessfully", { Id: Id, res })
            result(null, "Data Updated Scessfully", { Id: Id, res })
        }
    })

}

//Mail send
Template.mail = (Id, studentIds, result) => {
    const emailList = [];

    let count = 0;

    for (let i = 0; i < studentIds.length; i++) {
        let query1 = `SELECT vEmail FROM student WHERE Id = ${studentIds[i]}`;
        sql.query(query1, (err, resp1) => {
            if (err) {
                result({
                    message: err.message
                });
            } else {
                if (resp1 && resp1.length > 0) {
                    const email = resp1[0].vEmail;
                    emailList.push(email);

                    let query2 = `SELECT Template FROM template WHERE Id = ${Id}`;
                    sql.query(query2, (err, resp2) => {
                        if (err) {
                            result({ message: err.message });
                        } else {
                            mail(email, resp2[0].Template);
                        }
                        count++;
                        if (count === studentIds.length) {
                            result({
                                message: `Mail sent to: ${emailList.join(', ')}`
                            });
                        }
                    });
                } else {
                    result({
                        message: `No data found for student with Id: ${studentIds[i]}`
                    });
                }
            }
        });
    }
};

module.exports = Template;