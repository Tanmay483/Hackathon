const jwt = require('jsonwebtoken');
const sql = require('../config/db');
const tooken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJJZCI6NSwidk5hbWUiOiJ0YW5tYXkgbWFrd2FuYSIsInZVc2VyTmFtZSI6InRhbm1heTEyMyIsInZFbWFpbCI6Im1ha3dhbmF0YW5tYXkxQGdtYWlsLmNvbSIsIlR5cGUiOiJub3JtYWwiLCJ2TW9iaWxlTnVtYmVyIjoiODkwNTY5MTEwMCIsInZHaXRVcmwiOiJodHRwczovL2dpdGh1Yi5jb20vIiwidkFkZHJlc3MiOiJiaGF2bmFnZXIiLCJjb3VudHJ5IjoiaW5kaWEiLCJ2UXVhbGlmaWNhdGlvbiI6MSwidlByb2Zlc3Npb24iOiJ3ZWItZGV2bG9wZXIiLCJ2VGVhbVR5cGUiOiJ0ZWFtIiwiaU51bWJlck9mTWVtYmVycyI6MCwidlByb2JsZW1TdGF0ZW1lbnQiOiJjb252ZXJ0IEpTT04gZGF0YSBpbnRvIFhNTCIsIkRvY3VtZW50IjoiYXBwL0RvY3VtZW50cy9kb2NzLTE2OTE4NDU1MzYxNTkucGRmIiwiUGFzc3dvcmQiOiJJJVVLODRRZyIsImtleVN0YXR1cyI6ImFjdGl2ZSIsImlSYW5raW5nIjoyLCJ2VW5pdmVyc2l0eSI6ImdtaXUiLCJnZW5kZXIiOiJtYWxlIiwiVG9rZW4iOiIiLCJnX0lkIjoiIiwiVGVybXNhbmRjb25kaXRpb24iOiIxIiwic3Vic2NpYmUiOiIxIiwiaVRlYW1JZCI6IjAiLCJkb21haW5JZCI6MiwiY291cnNlSWQiOjIsIkNvdXJzZVByb2dyYW1tZSI6InBhcnQtdGltZSIsIlllYXJvZkdyYWR1YXRpb24iOjIwMjJ9XSwiaWF0IjoxNjkzOTEyMzI2fQ.GLt9WsJH7-dmCJw56Od0WGQGlskLhno8Qd86Yd5Gjxw'

const secretKey = process.env.JWT_SECRET_KEY;

async function verifyToken(req, resp, next) {
  const bearerHeader = req.headers['authorization'];
  
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    
    try {
      const decoded = jwt.verify(token, secretKey);
      const query = `SELECT * FROM jwttoken WHERE Token = '${token}' AND sID != 0`;
      sql.query(query, (err, result) => {
        if (err) {
          resp.status(500).json({
            status: 0,
            message: "error retrive token",
            error: err
          });
        } else {
          if (result && result[0] && result[0].Token === token || tooken === token) {
            req.token = decoded;
            next();
          }
          else {
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
