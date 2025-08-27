const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount your authentication routes here
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const jobsRoutes = require('./routes/jobs');
app.use('/api/jobs', jobsRoutes);



app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Once MongoDB is set up locally or via Atlas
// connect your backend by adding mongoose connection code in server.js
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Ensure your server.js loads environment variables and connects to MongoDB:
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


