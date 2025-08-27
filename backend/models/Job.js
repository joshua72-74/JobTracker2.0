// Job Schema

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, default: 'applied', enum: ['applied', 'interviewing', 'offered', 'rejected'] },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // references the user who owns the job
}, {
  timestamps: true // auto-created createdAt and updatedAt fields
});

// Improve query performance on frequently searched fields by adding indexes to your Mongoose schemas.
// Add index on status
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);