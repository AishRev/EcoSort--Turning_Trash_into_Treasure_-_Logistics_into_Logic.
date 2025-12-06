// /server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Bin = require('./models/Bin'); // Ensure this path matches your file structure

// The Dummy Data you requested
const dummyBins = [
  {
    binId: "101",
    location: { lat: 19.0760, lng: 72.8777, address: "Dadar Station" },
    status: "EMPTY"
  },
  {
    binId: "102",
    location: { lat: 19.0800, lng: 72.8800, address: "Shivaji Park" },
    status: "EMPTY"
  },
  {
    binId: "103",
    location: { lat: 19.0700, lng: 72.8600, address: "Worli Sea Face" },
    status: "EMPTY"
  }
];

const seedDB = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB for Seeding...");

    // 2. Clear existing data (Fresh Start!)
    await Bin.deleteMany({});
    console.log("🧹 Old data cleared.");

    // 3. Insert new dummy bins
    await Bin.insertMany(dummyBins);
    console.log("🌱 Database Seeded with 3 Empty Bins!");

    // 4. Disconnect
    mongoose.connection.close();
    console.log("👋 Connection closed.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();