const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); // Import your Sequelize config
const userRoutes = require('./routes/userRoutes');

// Load env vars
dotenv.config();

// Connect to XAMPP MySQL
connectDB();

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('src/uploads')); 
app.use('/api/users', userRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('UniEvents MySQL API is running...');
app.use(express.json()); // Allows us to read JSON from the frontend
app.use('/uploads', express.static('uploads')); // Makes uploaded images accessible

// Basic Test Route
app.get('/', (req, res) => {
  res.send('UniEvents API is running...');
});

const PORT = process.env.PORT || 5000;
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
  
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ DB Connection Error:', err));
  

