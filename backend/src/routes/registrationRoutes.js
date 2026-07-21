const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Submit new event registration
router.post('/add', async (req, res) => {
  try {
    const { fullName, email, department, batch, eventId, eventName, eventCategory, eventDate, eventTime, eventVenue } = req.body;

    if (!fullName || !email || !department || !batch || !eventName) {
      return res.status(400).json({ error: "All required form fields must be completed." });
    }

    const newRegistration = await Registration.create({
      fullName,
      email,
      department,
      batch,
      eventId,
      eventName,
      eventCategory,
      eventDate,
      eventTime,
      eventVenue
    });

    return res.status(201).json({
      message: "Registration successful!",
      registration: newRegistration
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Fetch registrations for a specific student email
router.get('/student/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const studentRegistrations = await Registration.findAll({
      where: { email },
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(studentRegistrations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
