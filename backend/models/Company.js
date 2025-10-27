const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  address: String,
  phone: String,
  website: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', companySchema);
