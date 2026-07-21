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

// Cancel / Delete a registration entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(404).json({ error: "Registration pass not found." });
    }

    await registration.destroy();
    return res.status(200).json({ message: "Registration cancelled successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
