const jwt = require('jsonwebtoken');
const User = require('../models/User.js');



const sign = (u) => jwt.sign({ id: u._id, role: u.role, name: u.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });

exports.register = async (req, res) => {
  try {
    let { role, name, email, phone, password } = req.body;

    // normalize
    email = email?.trim().toLowerCase();
    phone = phone?.trim();

    // build query
    const query = [];
    if (email) query.push({ email });
    if (phone) query.push({ phone });

    const exists = query.length > 0 ? await User.findOne({ $or: query }) : null;
    if (exists) return res.status(400).json({ message: 'User already exists' });

    // create user
    const user = await User.create({ role, name, email, phone, password });
    res.status(201).json({
      token: sign(user),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (e) {
    console.error("Register error:", e);
    res.status(500).json({ message: e.message });
  }
};
exports.login = async (req, res) => {
  try {
    console.log("📩 Login request body:", req.body); // <-- Debug log
    const { email, phone, password } = req.body;

    let query = {};
    if (email) query.email = email;
    else if (phone) query.phone = phone;
    else return res.status(400).json({ message: "Email or phone is required" });

    const user = await User.findOne(query).select("+password");
    if (!user || !(await user.compare(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: sign(user),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (e) {
    console.error("❌ Login error:", e);
    res.status(500).json({ message: e.message });
  }
};
