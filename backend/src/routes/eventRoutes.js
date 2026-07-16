const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// 1. PUBLISH AN EVENT
router.post('/add', async (req, res) => {
  try {
    const { eventName, eventImage, date, time, venue, category } = req.body;

    if (!eventName || !date || !time || !venue) {
      return res.status(400).json({ error: "Missing required event fields." });
    }

    const newEvent = await Event.create({
      eventName,
      eventImage, 
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

// 2. FETCH ALL EVENTS
router.get('/all', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'ASC']] });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. EDIT/UPDATE EVENT DATA
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, eventImage, date, time, venue, category } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.eventName = eventName;
    event.eventImage = eventImage;
    event.date = date;
    event.time = time;
    event.venue = venue;
    event.category = category;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. DELETE AN EVENT
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
