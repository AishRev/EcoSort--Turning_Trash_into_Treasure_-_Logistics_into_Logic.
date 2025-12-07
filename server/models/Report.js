const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  description: String,
  location: { lat: Number, lng: Number },
  imageUrl: String, // We will store a dummy URL or Base64
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'FAKE'], default: 'PENDING' },
  reportedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);