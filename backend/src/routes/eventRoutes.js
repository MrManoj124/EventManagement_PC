const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Publish a New Event (Description Removed)
router.post('/add', async (req, res) => {
  try {
    // Now receiving eventImage from the form
    const { eventName, eventImage, date, time, venue, category } = req.body;

    const newEvent = await Event.create({
      eventName,
      eventImage, // Save the actual URL provided
      date,
      time,
      venue,
      category
    });

    res.status(201).json({ message: "Event published!", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch All Events
router.get('/all', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'ASC']] });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an Event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Event deleted successfully." });
    }
    res.status(404).json({ message: "Event not found." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
