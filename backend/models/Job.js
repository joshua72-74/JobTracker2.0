const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { 
    type: String, 
    default: 'Applied', 
    enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'] 
  },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true // auto-created createdAt and updatedAt fields
});

// Index to improve query performance on status field
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);
