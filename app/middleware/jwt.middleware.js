const jwt = require('jsonwebtoken');
const sql = require('../config/db');


const secretKey = process.env.JWT_SECRET_KEY;
const API = [
  '/api/hackathon/all',
  '/api/type/all',
  '/api/type/domains',
  '/api/theme/all',
  '/api/categories/all',
  '/api/tab/all',
  '/api/course/all',
  '/api/qualification/all'
]

async function verifyToken(req, resp, next) {
  const path = req.path;
  if (API.includes(path)) {
    next();
    return;
  }
  
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    try {
      const decoded = jwt.verify(token, secretKey);
      const query = `SELECT * FROM student WHERE jwtToken = '${token}'`;
      sql.query(query, (err, result) => {
        if (err) {
          resp.status(500).json({
            status: 0,
            message: "error retrive token",
            error: err
          });
        } else {
          if (result && result[0] && result[0].jwtToken === token) {
            req.token = decoded;
            next();
          }
          else {
            resp.status(200).json({
              status: 0,
              message: "Token expired"
            });
          }
        }
      });
    } catch (error) {
      resp.status(200).json({
        status: 0,
        message: "Invalid token"
      });
    }
  } else {
    resp.status(200).json({
      status: 0,
      message: "Token is missing"
    });
  }
}

module.exports = verifyToken;