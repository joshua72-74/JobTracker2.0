// User schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  timestamps: true
});

//Improve query performance on frequently searched fields by adding indexes to your Mongoose schemas.
// Add index on email
// userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);


// Add validators such as email format check using regex or external validator libraries.
// Use pre-save middleware on User schema to hash passwords before saving
const bcrypt = require('bcryptjs');

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Add schema methods for password verification:
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};



