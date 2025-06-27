const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // or req.headers['authorization']

    if (!token) {
      return res.redirect('/auth/login'); // Or res.status(401).send("Not authorized")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    req.user = user; // attach to request object
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Invalid token');
  }
};

// Role-based middleware
const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    } else {
      return res.status(403).send('Forbidden: Access Denied');
    }
  };
};

module.exports = {
  isAuthenticated,
  checkRole,
};
