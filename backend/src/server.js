const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); // 1. Verify this import statement!

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('src/uploads')); 

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes); // 2. Verify this entry exists right here!

app.get('/', (req, res) => {
  res.send('UniEvents MySQL API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 
