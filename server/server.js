
// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // --- MODELS ---
// // const UserSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true }, // In real app, hash this!
// //   role: { 
// //     type: String, 
// //     enum: ['admin', 'worker', 'driver', 'resident'], 
// //     required: true 
// //   },
// //   points: { type: Number, default: 0 } // For Residents
// // });
// // const User = mongoose.model('User', UserSchema);

// // const BinSchema = new mongoose.Schema({
// //   binId: { type: String, required: true, unique: true },
// //   location: { lat: Number, lng: Number },
// //   status: { type: String, enum: ['EMPTY', 'FULL'], default: 'EMPTY' },
// //   lastCollected: { type: Date }
// // });
// // const Bin = mongoose.model('Bin', BinSchema);

// // const ReportSchema = new mongoose.Schema({
// //   description: String,
// //   status: { type: String, default: 'PENDING' },
// //   reportedAt: { type: Date, default: Date.now }
// // });
// // const Report = mongoose.model('Report', ReportSchema);

// // // --- AUTH ROUTES (Login & Register) ---

// // // 1. REGISTER (Sign Up)
// // app.post('/api/auth/register', async (req, res) => {
// //   const { username, password, role } = req.body;
// //   try {
// //     // Check if user exists
// //     const existing = await User.findOne({ username });
// //     if (existing) return res.status(400).json({ message: "Username taken" });

// //     const newUser = new User({ username, password, role });
// //     await newUser.save();
// //     res.json({ message: "Registration Successful!", user: newUser });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 2. LOGIN
// // app.post('/api/auth/login', async (req, res) => {
// //   const { username, password, role } = req.body;
// //   try {
// //     // Find user by Name AND Role (prevents Residents logging in as Admin)
// //     const user = await User.findOne({ username, password, role });
// //     if (user) {
// //       res.json(user);
// //     } else {
// //       res.status(401).json({ message: "Invalid Credentials or Role" });
// //     }
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // --- OPERATIONAL ROUTES ---

// // // Get All Bins
// // app.get('/api/bins', async (req, res) => {
// //   const bins = await Bin.find();
// //   res.json(bins);
// // });

// // // Worker: Mark Bin Full
// // app.post('/api/bins/mark-full', async (req, res) => {
// //   const { binId } = req.body;
// //   // Upsert: Create bin if it doesn't exist (Self-healing database)
// //   await Bin.findOneAndUpdate(
// //     { binId }, 
// //     { status: 'FULL', location: { lat: 19.0760, lng: 72.8777 } }, // Default loc if new
// //     { upsert: true }
// //   );
// //   res.json({ message: "Marked Full" });
// // });

// // // Driver: Collect
// // app.post('/api/bins/mark-empty', async (req, res) => {
// //   const { binId } = req.body;
// //   await Bin.findOneAndUpdate({ binId }, { status: 'EMPTY' });
// //   res.json({ message: "Collected" });
// // });

// // // Citizen: Report
// // app.post('/api/reports', async (req, res) => {
// //   await Report.create(req.body);
// //   res.json({ message: "Reported" });
// // });

// // // Connect DB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch(err => console.log("❌ DB Error:", err));

// // app.listen(5000, '0.0.0.0', () => console.log("🚀 Server Started on 5000"));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors({ origin: '*' })); // Allow All Connections (Tunnel/WiFi)
// app.use(express.json());

// // --- MODELS ---
// // Simple User (No Password needed for demo)
// const UserSchema = new mongoose.Schema({
//   username: String,
//   role: { type: String, enum: ['worker', 'driver'] },
//   assignedArea: { type: String, default: 'Dadar' }
// });
// const User = mongoose.model('User', UserSchema);

// // Bin Model
// const BinSchema = new mongoose.Schema({
//   binId: { type: String, required: true, unique: true },
//   location: { lat: Number, lng: Number },
//   status: { type: String, enum: ['EMPTY', 'FULL'], default: 'EMPTY' },
//   lastCollected: { type: Date }
// });
// const Bin = mongoose.model('Bin', BinSchema);

// // Report Model
// const ReportSchema = new mongoose.Schema({
//   description: String,
//   status: { type: String, default: 'PENDING' }, // PENDING -> VERIFIED
//   reportedAt: { type: Date, default: Date.now }
// });
// const Report = mongoose.model('Report', ReportSchema);

// // --- 1. ADMIN FEATURES ---
// // Get all staff
// app.get('/api/admin/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // Add a new staff member (No password)
// app.post('/api/admin/add-user', async (req, res) => {
//   const newUser = new User(req.body);
//   await newUser.save();
//   res.json({ message: "Staff Added" });
// });

// // --- 2. WORKER & DRIVER FEATURES ---
// // Get all bins
// app.get('/api/bins', async (req, res) => {
//   const bins = await Bin.find();
//   res.json(bins);
// });

// // Worker: Mark Bin Full
// app.post('/api/bins/mark-full', async (req, res) => {
//   const { binId } = req.body;
//   // Auto-create bin if it doesn't exist (Self-healing)
//   await Bin.findOneAndUpdate(
//     { binId }, 
//     { status: 'FULL', location: { lat: 19.0760, lng: 72.8777 } }, 
//     { upsert: true, new: true }
//   );
//   res.json({ message: "Bin Marked Full" });
// });

// // Driver: Collect (Mark Empty)
// app.post('/api/bins/mark-empty', async (req, res) => {
//   const { binId } = req.body;
//   await Bin.findOneAndUpdate({ binId }, { status: 'EMPTY' });
//   res.json({ message: "Bin Collected" });
// });

// // --- 3. CITIZEN FEATURES ---
// // Submit Report
// app.post('/api/reports', async (req, res) => {
//   await Report.create(req.body);
//   res.json({ message: "Report Submitted" });
// });

// // Get Pending Reports (For Worker to Verify)
// app.get('/api/reports/pending', async (req, res) => {
//   const reports = await Report.find({ status: 'PENDING' });
//   res.json(reports);
// });

// // Verify Report
// app.post('/api/reports/verify', async (req, res) => {
//   const { id, status } = req.body;
//   await Report.findByIdAndUpdate(id, { status });
//   res.json({ message: "Report Updated" });
// });

// // --- START ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected (No Auth Mode)"))
//   .catch(err => console.log("❌ DB Error:", err));

// app.listen(5000, '0.0.0.0', () => console.log("🚀 Server running on Port 5000"));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' })); 
app.use(express.json());

// --- MODELS ---
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  role: String
}));

const Bin = mongoose.model('Bin', new mongoose.Schema({
  binId: { type: String, unique: true },
  location: { lat: Number, lng: Number },
  status: { type: String, default: 'EMPTY' }
}));

const Report = mongoose.model('Report', new mongoose.Schema({
  description: String,
  status: { type: String, default: 'PENDING' }
}));

// --- ROUTES ---

// 1. ADMIN: Add Staff
app.post('/api/admin/add-user', async (req, res) => {
  console.log("➡️ Admin adding user:", req.body); // DEBUG LOG
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User Added" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.get('/api/admin/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 2. WORKER: Mark Bin Full
app.post('/api/bins/mark-full', async (req, res) => {
  console.log("➡️ Worker marking bin:", req.body); // DEBUG LOG
  const { binId } = req.body;
  
  // Update or Create Bin (Upsert)
  await Bin.findOneAndUpdate(
    { binId }, 
    { 
      status: 'FULL', 
      location: { lat: 19.0760, lng: 72.8777 } // Default Demo Location (Dadar)
    }, 
    { upsert: true, new: true }
  );
  res.json({ message: "Bin Marked Full" });
});

// 3. DRIVER: Get Bins
app.get('/api/bins', async (req, res) => {
  const bins = await Bin.find();
  res.json(bins);
});

app.post('/api/bins/mark-empty', async (req, res) => {
  console.log("➡️ Driver collecting bin:", req.body); // DEBUG LOG
  const { binId } = req.body;
  await Bin.findOneAndUpdate({ binId }, { status: 'EMPTY' });
  res.json({ message: "Bin Empty" });
});

// --- CONNECT ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

app.listen(5000, '0.0.0.0', () => console.log("🚀 Server running on 5000"));