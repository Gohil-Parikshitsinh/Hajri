const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookies = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ejsMate = require("ejs-mate");

require("dotenv").config();

const User = require("./models/User");

const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// Middleware
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Serve public files and setup EJS
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
// -------------------------------------------LOGIN-----------------------------------------------

app.get("/", (req, res) => {
  res.send("This is main page");
});

app.get("/auth/login", (req, res) => {
  res.render("users/login");
});

app.post("/auth/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  console.log(user.email);
  console.log(user.password);
  console.log(user.role);

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!user) return res.status(401).json({ message: "Invalid email or role" });
  if (user.password !== password) {
    return res.render("login", { error: "Invalid password" });
  }
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  res.redirect("/dashboard");


  
});

app.get("/dashboard",(req,res)=>{
    if (!req.session.user) {
        return res.redirect("/auth/login");
      }
    
      const user = req.session.user
      res.render("dashboards/adminDashboard", {user});
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
