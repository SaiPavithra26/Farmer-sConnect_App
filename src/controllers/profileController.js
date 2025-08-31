const FarmerProfile = require('../models/FarmerProfile');

// Get Farmer Profile by userId
const get = async (req, res) => {
  try {
    const p = await FarmerProfile.findOne({ userId: req.user.id });
    res.json(p || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Farmer Profile
const create = async (req, res) => {
  try {
    const { fullName, locationText, lat, lng, crops, phone, experience, kycUrl } = req.body;

    const exists = await FarmerProfile.findOne({ userId: req.user.id });
    if (exists) return res.status(400).json({ message: 'Profile exists' });

    const profile = await FarmerProfile.create({
      userId: req.user.id,
      fullName,
      locationText,
      geo: { type: 'Point', coordinates: [lng, lat] },
      crops,
      phone,
      experience,
      kycUrl
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, get };
