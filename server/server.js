// /server/server.js
require('dotenv').config(); // Load .env
const mongoose = require('mongoose');

// Connect using the variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));