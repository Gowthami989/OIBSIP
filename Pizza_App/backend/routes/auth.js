const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 JWT Secret Key
// (Later .env file lo pettali, ippudu ok)
const JWT_SECRET = "your_secret_key";


// =======================
// 🔹 SIGNUP ROUTE
// =======================
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ User already exist avtada?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Password hash cheyyadam
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ New user create cheyyadam
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // 4️⃣ JWT token generate cheyyadam (IMPORTANT)
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Token + user info frontend ki pampadam
    res.json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
});


// =======================
// 🔹 LOGIN ROUTE
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ User unda?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Password match avtunda?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ JWT token generate cheyyadam
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Token + user info pampadam
    res.json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
