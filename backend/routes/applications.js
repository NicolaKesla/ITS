const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Application = require('../models/Application');
const Student = require('../models/Student');
const Internship = require('../models/Internship');

// Get all applications
router.get('/', auth, async (req, res) => {
  try {
    let query = {};

    // Students see only their applications
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user._id });
      if (!student) {
        return res.status(404).json({ message: 'Student profile not found' });
      }
      query.student = student._id;
    }

    const applications = await Application.find(query)
      .populate('internship', 'title duration startDate endDate')
      .populate('student', 'studentId department')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single application
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('internship')
      .populate('student')
      .populate('evaluation.evaluatedBy', 'firstName lastName');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create application (student only)
router.post('/', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      internship: req.body.internship,
      student: student._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this internship' });
    }

    const application = new Application({
      internship: req.body.internship,
      student: student._id,
      coverLetter: req.body.coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (company/admin only)
router.put('/:id/status', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = req.body.status;
    await application.save();

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add evaluation (admin only)
router.put('/:id/evaluate', auth, authorize('admin'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.evaluation = {
      rating: req.body.rating,
      feedback: req.body.feedback,
      evaluatedBy: req.user._id,
      evaluatedAt: Date.now()
    };

    await application.save();
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Students can only delete their own pending applications
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user._id });
      if (!student || application.student.toString() !== student._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      if (application.status !== 'pending') {
        return res.status(400).json({ message: 'Cannot delete non-pending application' });
      }
    }

    await application.deleteOne();
    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
