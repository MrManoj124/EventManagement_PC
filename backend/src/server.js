const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const venueRoutes = require('./routes/venueRoutes');
const contactRoutes = require('./routes/contactRoutes'); // 1. Verify this import statement is present!

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Essential middleware to parse JSON req.body payloads

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/contact', contactRoutes); // 2. Verify this route handler entry exists!

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 
