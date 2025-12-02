const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const optionalAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId).select(
      "_id firstName lastName email role status"
    );

    if (!user || user.status !== "active") {
      // Nếu token sai / user inactive -> coi như guest
      return next();
    }

    user.id = user._id.toString();
    req.user = user;
    next();
  } catch (error) {
    console.error("optionalAuth error:", error);
    // Token hỏng => bỏ qua, cho request chạy tiếp như guest
    next();
  }
};

module.exports = optionalAuth;
