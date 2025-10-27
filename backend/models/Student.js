const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4
  },
  phone: String,
  address: String,
  skills: [String],
  resume: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
