const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

app.use(helmet());
app.use(xss());
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, try again later"
});
app.use(limiter);

connectDB();
const authRoutes = require("./src/routes/authRoutes.js");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");





app.use('/api/auth', authRoutes);
app.use('/api/farmer-profiles', require('./src/routes/farmerProfileRoutes.js'));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
