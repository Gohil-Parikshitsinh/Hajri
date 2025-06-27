const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/mainRoutes')); // ✅ Add this

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
