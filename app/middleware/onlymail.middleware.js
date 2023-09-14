const nodemailer = require('nodemailer');

module.exports = function sendEmail(Email, temp) {
    var transport = nodemailer.createTransport({
        mailer: 'smtp',
        host: "server116.web-hosting.com",
        port: 465,
        auth: {
            user: "info@infinitysoftech.co",
            pass: "7GDFq.jW7Id@"
        }
    });

    var mailOption = {
        from: 'info@infinitysoftech.co',
        to: Email,
        subject: "Infinity Softech",
        html: temp
    };

    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully:" + info.response);
        }
    });
};