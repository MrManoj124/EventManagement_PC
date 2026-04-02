const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); // Import your Sequelize config
const userRoutes = require('./routes/userRoutes');

// Load env vars
dotenv.config();

// Connect to XAMPP MySQL
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('src/uploads')); 
app.use('/api/users', userRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('UniEvents MySQL API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
