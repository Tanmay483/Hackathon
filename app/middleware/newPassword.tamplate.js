const nodemailer = require('nodemailer');
let template =
    `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>template</title>
        <style>
        .logo {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 315px;
            padding-top: 25px;
        }
        
        .img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 18px;
            width: 500px;
            height: 300px;
        }
        
        .text {
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 16px;
            padding-bottom: 10px;
        }
        
        .footers {
            background-color: lightblue;
            /* margin-top: 50px; */
            margin-left: 0px;
            margin-right: 0px;
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;
        
        }
        
        .bg {
            width: 500px;
            align-content: center;
            margin: auto;
            background-color: antiquewhite;
        }
        
        .social {
            text-align: center;
            width: auto;
        }
        
        
        .social ul {
            padding: 0%;
            justify-content: center;
        }
        
        .social li {
            margin: 0 10px;
        }
        
        .social img {
            height: 25px;
            width: 25px;
            margin-left: 15px;
            margin-right: 15px;
            text-align: center;
        }
        
        .footers>h3,
        .text2 {
            margin: 0;
        }
        
        .main {
            display: flex;
            padding-top: 10px;
        }
        
        .section1 {
            width: 33%;
            border-right: 2px solid black;
            padding-right: 5px;
        }
        .social > a{
            letter-spacing: 0;
            word-spacing: 0;
            margin: 0;
        }
        .social > a > img{
            margin: 5px;
        }
        .section1 > p{
            margin-top: 0;
            padding-left: 5px;
            text-align: center;
        }
        .section2 {
            width: 33%;
            padding-right: 5px;
        }
        .section2 > p{
            margin-top: 0;
            padding-left: 5px;
            text-align: center;
        }
        .social ul > a > img{
            margin: 0px 20px;
        }
        </style>
    </head>
    
    <body>
        <div class="bg">
    
            <header>
                <img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk="
                    alt="image" class="img">
            </header>
    
            <div class="text">
                <h1>Registration Successful</h1>
                <p>Dear {vEmail},
                    Congratulations on your successful registration!
                    Your generated password is: <b>{password}</b>
    
                    Thank you for registering with us!
                </p>
            </div>
    
    
            <footer class="footers">
                <h3>Hackathon</h3>
                <p class="text2">Gyanmanjri Institute of technology</p>
                <div class="social">
                    <ul>
                        <a href="https://web.whatsapp.com/"><img
                                src="Icone/whatsapp.png"
                                alt="WhatsApp"></a>
                        <a href="https://www.facebook.com"><img
                                src="Icone/facebook.png"
                                alt="Facebook"></a>
                        <a href="https://linkedin.com"><img
                                src="Icone/linkedin.png" alt="LinkedIn"></a>
                        <a href="https://twitter.com"><img
                                src="Icone/twitter.png"
                                alt="Twitter"></a>
                    </ul>
                </div>
                <div class="main">
                    <div class="section1">
                        <p>Follow us for informative & cute content</p>
                        <div class="social">
                            <a href="https://www.instagram.com/"><img
                                    src="Icone/instagram.png"
                                    alt="Instagram" class="hi"></a>
                            <a href="https://web.telegram.org/a/"><img
                                    src="Icone/telegram.png"
                                    alt="Teligram" class="hi"></a>
                            <a href="https://linkedin.com"><img
                                    src="Icone/linkedin.png"
                                    alt="LinkedIn" class="hi"></a>
                            <a href="https://discord.com/"><img
                                    src="Icone/discord.png"
                                    alt="Discord" class="hi"></a>
    
                        </div>
                    </div>
                    <div class="section1">
                        <p>coin store</p>
                        <div class="social">
                            <a href="https://unstop.com/"><img
                                    src="Icone/unstop.jpg"
                                    alt="unstop" class="hi"></a>
                        </div>
                    </div>
                    <div class="section2">
                        <p>parent of our app</p>
                        <div class="social">
                            <a href="https://play.google.com/"><img
                               src="Icone/playstore.png"
                               alt="Playstore" class="hi"></a>
                            <a href="https://web.whatsapp.com/"><img
                                src="Icone/whatsapp.png"
                                alt="WhatsApp" class="hi"></a>                           
                        </div>
                </div>
                </div>
                <div>
                    <p>Queries? We're just one email away : info@infinitysoftech.co</p>
                    <p>&copy; 2023 Infinity Softech. All rights reserved.</p>
                </div>
    
            </footer>
        </div>
    </body>
    
    </html>
`
module.exports = function sendEmail(vEmail, password) {
    var transport = nodemailer.createTransport({
        mailer: 'smtp',
        host: "server116.web-hosting.com",
        port: 465,
        auth: {
            user: "info@infinitysoftech.co",
            pass: "?VlXMbhSU}r#"
        }
    });

    var mailOption = {
        from: 'info@infinitysoftech.co',
        to: vEmail,
        subject: 'Hackathon Registration',
        html: template.replace('{vEmail}', vEmail).replace('{password}', password)
    };

    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully:" + info.response);
        }
    });
};