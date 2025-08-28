const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Connect to MongoDB and then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on DB connection failure
  });
