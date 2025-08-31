const Order = require("../models/Order");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      buyerId: req.user.id
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// My orders (buyer)
exports.getMyOrders = async (req, res) => {
  const { status } = req.query;
  const filter = { buyerId: req.user.id };
  if (status) filter.status = status;
  const orders = await Order.find(filter).populate("products.product");
  res.json(orders);
};

// Farmer orders
exports.getFarmerOrders = async (req, res) => {
  const { status } = req.query;
  const filter = { farmerId: req.user.id };
  if (status) filter.status = status;
  const orders = await Order.find(filter).populate("products.product");
  res.json(orders);
};

// Single order
exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("products.product");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// Update status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};

// Accept order
exports.acceptOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: "accepted" }, { new: true }
  );
  res.json(order);
};

// Reject order
exports.rejectOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: "rejected", notes: req.body.reason }, { new: true }
  );
  res.json(order);
};

// Mark shipped
exports.markAsShipped = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: "shipped", trackingInfo: req.body.trackingInfo }, { new: true }
  );
  res.json(order);
};

// Mark delivered
exports.markAsDelivered = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: "delivered" }, { new: true }
  );
  res.json(order);
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: "cancelled", notes: req.body.reason }, { new: true }
  );
  res.json(order);
};

// Tracking
exports.trackOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order.trackingInfo || {});
};

// Analytics (simple version)
exports.getOrderAnalytics = async (req, res) => {
  const filter = req.query.farmerId ? { farmerId: req.query.farmerId } : {};
  const totalOrders = await Order.countDocuments(filter);
  const delivered = await Order.countDocuments({ ...filter, status: "delivered" });
  const pending = await Order.countDocuments({ ...filter, status: "pending" });
  res.json({ totalOrders, delivered, pending });
};

// Rate order
exports.rateOrder = async (req, res) => {
  const { rating, review } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { rating: { value: rating, review } },
    { new: true }
  );
  res.json(order);
};
