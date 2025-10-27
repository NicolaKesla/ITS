const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  duration: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: String,
  stipend: Number,
  positions: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'filled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Internship', internshipSchema);
