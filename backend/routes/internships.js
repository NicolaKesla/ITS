const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Internship = require('../models/Internship');
const Company = require('../models/Company');

// Get all internships
router.get('/', auth, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const internships = await Internship.find(query)
      .populate('company', 'companyName industry')
      .sort({ createdAt: -1 });

    res.json(internships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single internship
router.get('/:id', auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('company', 'companyName industry address website');

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create internship (company only)
router.post('/', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    
    if (!company && req.user.role !== 'admin') {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const internship = new Internship({
      ...req.body,
      company: company ? company._id : req.body.company
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update internship
router.put('/:id', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if user owns this internship
    const company = await Company.findOne({ user: req.user._id });
    if (req.user.role !== 'admin' && (!company || internship.company.toString() !== company._id.toString())) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(internship, req.body);
    await internship.save();

    res.json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete internship
router.delete('/:id', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if user owns this internship
    const company = await Company.findOne({ user: req.user._id });
    if (req.user.role !== 'admin' && (!company || internship.company.toString() !== company._id.toString())) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await internship.deleteOne();
    res.json({ message: 'Internship deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
