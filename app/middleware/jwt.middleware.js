const jwt = require('jsonwebtoken');
const sql = require('../config/db');

const secretKey = process.env.JWT_SECRET_KEY;

async function verifyToken(req, resp, next) {
  const bearerHeader = req.headers['authorization'];
  
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    
    try {
      const decoded = jwt.verify(token, secretKey);
      const query = `SELECT Token FROM jwttoken WHERE Id = 1`;
      sql.query(query, (err, result) => {
        if (err) {
          resp.status(500).json({
            status: 0,
            message: "error retrive token"
          });
        } else {
          const storedToken = result[0].Token;
          if (token === storedToken) {
            req.token = decoded;
            next();
          } else {
            resp.status(401).json({
              status: 0,
              message: "Token expired"
            });
          }
        }
      });
    } catch (error) {
      resp.status(401).json({
        status: 0,
        message: "Invalid token"
      });
    }
  } else {
    resp.status(401).json({
      status: 0,
      message: "Token is missing"
    });
  }
}

module.exports = verifyToken;
