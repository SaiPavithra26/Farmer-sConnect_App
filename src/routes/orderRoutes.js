const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");
const {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  getOrder,
  updateOrderStatus,
  acceptOrder,
  rejectOrder,
  markAsShipped,
  markAsDelivered,
  cancelOrder,
  trackOrder,
  getOrderAnalytics,
  rateOrder,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/farmer-orders", protect, getFarmerOrders);
router.get("/analytics", protect, getOrderAnalytics);

router.get("/:id", protect, getOrder);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/accept", protect, acceptOrder);
router.put("/:id/reject", protect, rejectOrder);
router.put("/:id/shipped", protect, markAsShipped);
router.put("/:id/delivered", protect, markAsDelivered);
router.put("/:id/cancel", protect, cancelOrder);

router.get("/:id/tracking", protect, trackOrder);
router.post("/:orderId/rating", protect, rateOrder);

module.exports = router;
