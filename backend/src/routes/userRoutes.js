const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, registration_number, password } = req.body;
    
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      registration_number,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN ROUTE (Add this part)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare typed password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Success! Return user data (excluding password)
    const { password: _, ...userData } = user.toJSON();
    res.status(200).json({ message: "Login successful", user: userData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... existing imports (express, User, bcrypt)

// RESET PASSWORD ROUTE
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update the password in database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
