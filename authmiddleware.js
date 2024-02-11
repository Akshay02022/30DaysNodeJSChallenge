const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY ;

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) 
    return res.status(401).json({error: 'Unauthorized: No token provided' });

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({error: 'Unauthorized: Invalid token' });
    
    req.data = decoded;
    next();
  });
}
module.exports = authMiddleware;