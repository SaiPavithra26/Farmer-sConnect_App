const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [orderItemSchema],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: { type: String, enum: ["COD", "UPI", "Card"], required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected", "shipped", "delivered", "cancelled"], 
    default: "pending" 
  },
  deliveryDate: Date,
  notes: String,
  trackingInfo: Object,
  rating: {
    value: Number,
    review: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
