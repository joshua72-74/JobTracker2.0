const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');
const User = require('./models/User');

async function test() {
  await mongoose.connect(process.env.MONGO_URI);

  // Create user
  const user = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });
  await user.save();

  // Create job
  const job = new Job({
    title: 'Developer',
    company: 'Tech Inc',
    user: user._id
  });
  await job.save();

  console.log('Test documents created successfully');
  mongoose.disconnect();
}

test().catch(console.error);
