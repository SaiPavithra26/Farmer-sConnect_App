const Product = require("../models/Product");

// @desc    Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get logged-in farmer's products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      farmerId: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      farmerId: req.user.id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query, filters } = req.body;
    let conditions = {};

    if (query) conditions.name = { $regex: query, $options: "i" };
    if (filters?.category) conditions.category = filters.category;
    if (filters?.isOrganic) conditions.isOrganic = true;
    if (filters?.location) conditions.location = filters.location;

    if (filters?.priceMin || filters?.priceMax) {
      conditions.price = {};
      if (filters.priceMin) conditions.price.$gte = filters.priceMin;
      if (filters.priceMax) conditions.price.$lte = filters.priceMax;
    }

    const products = await Product.find(conditions);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Products by farmer ID
exports.getProductsByFarmer = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.params.farmerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Rate product
exports.rateProduct = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.ratings.push({ user: req.user.id, rating, review });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Upload product images (dummy — replace with Cloudinary/S3 later)
exports.uploadProductImages = async (req, res) => {
  try {
    res.json({ uploaded: req.body.images });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
