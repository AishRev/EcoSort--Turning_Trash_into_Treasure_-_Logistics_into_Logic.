const router = require('express').Router();
const Bin = require('../models/Bin');

// 1. Get all bins (For Driver Map - Filter by FULL)
router.get('/all', async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Worker updates bin status (QR Scan Trigger)
router.post('/update', async (req, res) => {
  const { binId, status, workerName } = req.body;
  try {
    const updatedBin = await Bin.findOneAndUpdate(
      { binId: binId },
      { 
        status: status, 
        lastUpdated: new Date(),
        reportedBy: workerName
      },
      { new: true, upsert: true } // Create if doesn't exist
    );
    res.json(updatedBin);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;