const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Job = require('../models/Job');

// Create a job
router.post('/', auth, async (req, res) => {
  try {
    const job = new Job({ ...req.body, user: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error.message);
    res.status(400).json({ msg: error.message });
  }
});

// Get jobs with filter/search for logged-in user
router.get('/', auth, async (req, res) => {
  const { status, company, search, from, to } = req.query;
  let query = { user: req.user.id };

  if (status) query.status = status;
  if (company) query.company = company;
  if (search) query.title = { $regex: search, $options: 'i' }; // case-insensitive
  if (from && to) query.appliedDate = { $gte: new Date(from), $lte: new Date(to) };

  try {
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error.message);
    res.status(500).json({ msg: error.message });
  }
});

// Update a job
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error('Update job error:', error.message);
    res.status(400).json({ msg: error.message });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json({ msg: 'Job deleted', job });
  } catch (error) {
    console.error('Delete job error:', error.message);
    res.status(500).json({ msg: error.message });
  }
});

// Example protected route
router.get('/myjobs', auth, (req, res) => {
  res.send('Your job applications are here!');
});

// Admin-only example route
router.delete('/admin-only-route', auth, role(['admin']), (req, res) => {
  // Your delete logic here
  res.json({ msg: 'Admin only resource deleted' });
});

// Export jobs as CSV
router.get('/export', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    let csv = 'Title,Company,Status,AppliedDate\n';
    jobs.forEach(job => {
      csv += `${job.title},${job.company},${job.status},${job.appliedDate.toISOString()}\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('job-applications.csv');
    res.send(csv);
  } catch (error) {
    console.error('CSV export error:', error.message);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
