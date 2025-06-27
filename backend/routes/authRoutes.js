const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');


// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});


// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.render('login', { error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('login', { error: 'Incorrect password' });

    // ✅ If user and password match, create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect('/dashboard'); // Go to dashboard

  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Server error' });
  }
});


// Show register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
router.post('/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    if (!fullName || !email || !password || !role) {
      return res.render('register', { error: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render('register', { error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return res.render('register', { success: 'User registered successfully!' });

  } catch (err) {
    console.error(err);
    return res.render('register', { error: 'Server error' });
  }
});


module.exports = router;
