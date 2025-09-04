const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ensure this file exists

// Middleware factory
exports.protect = (roles = []) => {
  // Always normalize roles into an array
  //  

  return async (req, res, next) => {
    try {
      // Check token in header
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
      ) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally fetch user from DB (recommended for latest info)
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // attach user to request

      // Role-based check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
