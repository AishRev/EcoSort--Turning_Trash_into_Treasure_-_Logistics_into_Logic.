const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'driver', 'worker'], required: true },
  assignedArea: { type: String, default: 'General' }
});

module.exports = mongoose.model('User', UserSchema);