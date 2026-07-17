const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const venueRoutes = require('./routes/venueRoutes'); // 1. Verify this import statement exists!

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Essential to read req.body on the backend

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes); // 2. Verify this route mount line exists!

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 
