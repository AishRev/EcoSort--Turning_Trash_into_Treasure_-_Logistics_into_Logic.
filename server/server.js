const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const binRoutes = require('./routes/binRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB (Replace with your local or Atlas URI)
mongoose.connect('mongodb://localhost:27017/ecosort', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/bins', binRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));