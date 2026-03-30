const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON from the frontend
app.use('/uploads', express.static('uploads')); // Makes uploaded images accessible

// Basic Test Route
app.get('/', (req, res) => {
  res.send('UniEvents API is running...');
});

const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ DB Connection Error:', err));
  