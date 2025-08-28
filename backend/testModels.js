const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');
const User = require('./models/User');

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');

    // Create user (password will be hashed by pre-save middleware)
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();

    // Create job linked to user
    const job = new Job({
      title: 'Developer',
      company: 'Tech Inc',
      user: user._id
    });
    await job.save();

    console.log('Test documents created successfully');
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await mongoose.disconnect();
  }
}

test();
