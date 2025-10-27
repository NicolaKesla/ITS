const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  coverLetter: String,
  appliedAt: {
    type: Date,
    default: Date.now
  },
  evaluation: {
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    feedback: String,
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    evaluatedAt: Date
  }
});

module.exports = mongoose.model('Application', applicationSchema);
