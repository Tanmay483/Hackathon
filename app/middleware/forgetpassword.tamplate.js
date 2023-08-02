const nodemailer = require('nodemailer')

const Template =
    `<!DOCTYPE html>
<html>
<head>
<title>template</title>
<style>

.logo{
display: block;
margin-left: auto;
margin-right: auto;
width: 315px;
padding-top: 25px;
}
.img{
display: block;
margin-left: auto;
margin-right: auto;
margin-top: 18px;
width: 400px;
height: 250px;
}

.text{
font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
text-align: center;
margin-left: 10px;
margin-right: 10px;
font-size: 16px;
}

.footers{
background-color:gray;
margin-top: 50px;
margin-left: 0px;
margin-right: 0px;
text-align: center;
padding-top: 10px;
padding-bottom: 10px;

}

.bg{
width: 500px;
align-content: center;
margin: auto;
background-color: antiquewhite;
}
.social{
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



</style>
</head>
<body>
<link rel="stylesheet" type="text/css" href="style.css">
<div class="bg">

<header>
<img src="https://www.infinitysoftech.co/wp-content/uploads/2023/02/logo-black-text.png" alt="logo" class="logo">
</header>

<img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt="image" class="img">


<div class="text">
<h1>New Password</h1>
    <p>Dear {vName},
    <br> Email: {vEmail}
    <br> Password: <b>{password}</b>

  </p>
</div>


<footer class="footers">
<p>&copy; 2023 Infinity Softech. All rights reserved.</p>
<div class="social">
<ul>
  <a href="https://www.instagram.com"><img src="https://img.freepik.com/premium-vector/purple-gradiend-social-media-logo_197792-1883.jpg" alt="Instagram"></a>
  <a href="https://www.facebook.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook"></a>
  <a href="https://linkedin.com"><img src="https://www.freepnglogos.com/uploads/linkedin-in-logo-png-1.png" alt="LinkedIn"></a>
  <a href="https://twitter.com"><img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="Twitter"></a>
</ul>
</div>
</footer>


</footer>
</div>
</body>
</html>
`

module.exports = function sendEmail(vEmail, password,vName) {
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
    subject: 'New Password',
    html: Template.replace('{vEmail}', vEmail).replace('{password}', password).replace('{vName}',vName)
  };
  transport.sendMail(mailOption, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log("Email sent successfully:" + info.response);
      }
  });
};