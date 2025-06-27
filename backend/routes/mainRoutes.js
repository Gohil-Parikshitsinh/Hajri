const express = require('express');
const router = express.Router();
const { isAuthenticated, checkRole } = require('../middleware/authMiddleware');

// Dashboard - only logged-in users (any role)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('./dashboard.ejs', { user: req.user });
});

// HR Attendance Page - only HR role
router.get('/attendance', isAuthenticated, checkRole('hr'), (req, res) => {
  res.render('attendance');
});

// Admin Page - only Admin role
router.get('/admin', isAuthenticated, checkRole('admin'), (req, res) => {
  res.render('admin');
});

module.exports = router;
