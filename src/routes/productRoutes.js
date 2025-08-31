const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");
const {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  searchProducts,
  getProductsByFarmer,
  rateProduct,
  uploadProductImages,
} = require("../controllers/productController");

// Basic CRUD
router.get("/", getProducts);
router.post("/", protect, createProduct);

// Extras (static routes first)
router.get("/my-products", protect, getMyProducts);
router.get("/featured", getFeaturedProducts);
router.post("/search", searchProducts);
router.get("/farmer/:farmerId", getProductsByFarmer);
router.post("/upload-images", protect, uploadProductImages);

// Dynamic routes (keep these last)
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/:id/rating", protect, rateProduct);

module.exports = router;
