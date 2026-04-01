const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Route
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

module.exports = router;
