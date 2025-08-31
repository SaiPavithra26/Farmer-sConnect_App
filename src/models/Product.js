const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g. kg, litre
  category: { type: String, required: true },
  images: [String],
  stock: { type: Number, default: 0 },
  isOrganic: { type: Boolean, default: false },
  harvestDate: { type: Date },
  tags: [String],
  featured: { type: Boolean, default: false },
  ratings: [ratingSchema],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
