const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// Get all jobs for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Create a job application
router.post('/', auth, async (req, res) => {
  try {
    const { company, position, status } = req.body;
    
    if (!company || !position) {
      return res.status(400).json({ msg: 'Company and position are required' });
    }

    const newJob = new Job({
      company,
      position,
      status: status || 'Applied',
      userId: req.user.id
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err.message);
    res.status(500).json({ msg: 'Server Error: ' + err.message });
  }
});

// Update a job status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, company, position } = req.body;
    let job = await Job.findById(req.params.id);
    
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: { status, company, position } },
      { new: true }
    );
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error('Error deleting job:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;