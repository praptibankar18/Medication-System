const jwt = require('jsonwebtoken');
require("dotenv").config();


// Middleware to verify JWT token
module.exports = isUserAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};