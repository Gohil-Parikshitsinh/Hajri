// middlewares/authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next(); // proceed to next middleware or route
    }
    return res.status(401).json({ message: "Unauthorized: Please login first." });
  }
  
  module.exports = isAuthenticated;
  