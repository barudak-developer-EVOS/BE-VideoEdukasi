const jwt = require("jsonwebtoken");

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Tambahkan data user ke request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Role middleware
const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).json({
      error: `Access forbidden: Only ${requiredRole} can perform this action`,
    });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };
