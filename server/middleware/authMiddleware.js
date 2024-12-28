const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Periksa apakah header Authorization ada
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Tambahkan data user ke request

    // Pastikan payload memiliki properti `role`
    if (!req.user.role) {
      return res.status(400).json({ error: "Invalid token. Role is missing." });
    }

    next(); // Lanjutkan ke middleware berikutnya
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Role middleware
const roleMiddleware = (requiredRole) => (req, res, next) => {
  // Periksa apakah req.user tersedia
  if (!req.user) {
    return res.status(401).json({ error: "Access denied. No user found." });
  }

  // Jika requiredRole berupa array, periksa apakah peran pengguna cocok
  if (Array.isArray(requiredRole)) {
    if (!requiredRole.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access forbidden: You need one of these roles: ${requiredRole.join(
          ", "
        )}`,
      });
    }
  } else if (req.user.role !== requiredRole) {
    // Jika hanya satu role yang diizinkan
    return res.status(403).json({
      error: `Access forbidden: Only ${requiredRole} can perform this action.`,
    });
  }

  next(); // Lanjutkan ke middleware berikutnya
};

module.exports = { authMiddleware, roleMiddleware };
