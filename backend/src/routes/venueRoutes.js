const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// Fetch all available locations
router.get('/all', async (req, res) => {
  try {
    const venues = await Venue.findAll({ order: [['venueName', 'ASC']] });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a brand new location options variant row
router.post('/add', async (req, res) => {
  try {
    const { venueName } = req.body;
    if (!venueName) return res.status(400).json({ error: "Location title parameters missing." });

    const existing = await Venue.findOne({ where: { venueName } });
    if (existing) return res.status(400).json({ error: "This venue option is already registered." });

    const newVenue = await Venue.create({ venueName });
    res.status(201).json({ message: "New venue option created successfully!", venue: newVenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
