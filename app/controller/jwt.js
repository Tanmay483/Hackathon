const jwt = require('jsonwebtoken')
const secretKey = "secretKey"
 
 function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
  
      try {
        const decoded = jwt.verify(token, secretKey);
        req.token = decoded;
        next();
      } catch (error) {
        resp.status(401).json({
          error: "Invalid token"
        });
      }
    } else {
      resp.status(401).json({
        error: "Token is missing"
      });
    }
  }
  
  module.exports=verifyToken