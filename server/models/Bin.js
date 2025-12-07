// const mongoose = require('mongoose');

// const BinSchema = new mongoose.Schema({
//   binId: { type: String, required: true, unique: true },
//   location: {
//     lat: Number,
//     lng: Number,
//     address: String
//   },
//   status: { 
//     type: String, 
//     enum: ['EMPTY', 'FULL', 'COLLECTED'], 
//     default: 'EMPTY' 
//   },
//   lastUpdated: { type: Date, default: Date.now },
//   reportedBy: { type: String } // Worker Name
// });

// module.exports = mongoose.model('Bin', BinSchema);

const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['EMPTY', 'FULL'], default: 'EMPTY' },
  lastCollected: { type: Date }
});

module.exports = mongoose.model('Bin', BinSchema);