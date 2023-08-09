const Forgetpassword = require('../models/forgetpassword.model')

exports.newpassword = (req, res) => {
    if (!req.body) {
        res.send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const login = new Forgetpassword({
        vEmail: req.body.vEmail,
    });

    Forgetpassword.newpassword(login.vEmail, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "Invalid Email"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "new password has been sent to your email."
            });
        }
    });
};
