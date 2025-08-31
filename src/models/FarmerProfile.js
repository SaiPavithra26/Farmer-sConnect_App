const mongoose = require('mongoose');
const FarmerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  fullName: { type: String, required: true },
  locationText: { type: String, required: true },     // human readable
  geo: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], index: '2dsphere' } }, // [lng, lat]
  crops: { type: [String], default: [] },
  phone: { type: String, required: true },
  experience: { type: Number, default: 0 },
  kycUrl: { type: String }, // cloud image
}, { timestamps: true });

module.exports = mongoose.model('FarmerProfile', FarmerProfileSchema);
