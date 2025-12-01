const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Require user to be authenticated (JWT must be present & valid)
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Expected format: "Bearer <token>"
  const token = authorization.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // createToken signs { id, role }

    const user = await User.findById(userId).select(
      "_id firstName lastName email role status"
    );

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ error: "User is not active" });
    }

    // Attach current user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// Require user to have one of the given roles (e.g. "admin", "doctor")
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    next();
  };
};

module.exports = { requireAuth, requireRole };
