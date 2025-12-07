const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper: create JWT token for user
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // payload
    process.env.JWT_SECRET,            // secret in .env
    { expiresIn: "3d" }                // token valid for 3 days
  );
};

// Small helper: normalize bool from querystring
const toBool = (v) => ["true", "1", true, 1, "on", "yes"].includes(v);

// GET /api/users?q=kw&role=doctor&status=true
// Only admin & doctor (checked in routes with requireRole)
const getAll = async (req, res) => {
  const { q, role, status } = req.query;

  try {
    const filter = {};

    if (role !== undefined) filter.role = role;
    if (status !== undefined) filter.status = toBool(status);

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
      ];
    }

    const users = await User.find(filter)
      .select("-password") // don't send password
      .sort({ createdDateTime: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// GET /api/users/doctors/public
// Public: list all active doctors with basic public info
const getPublicDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      status: true, // only active doctors
    }).select(
      "firstName lastName email phone doctorInfo"
    );

    res.json(doctors);
  } catch (error) {
    console.error("getPublicDoctors error:", error);
    res.status(500).json({ message: "Failed to retrieve doctors" });
  }
};

// GET /api/users/:userId
// - admin & doctor: can view any user
// - normal user: can only view their own profile
const getById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user; // from authMiddleware

    // Normal user: only own profile
    if (requester?.role === "user" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "You can only view your own profile" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// POST /api/users
// Admin creates user/doctor/admin
const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email & password are required",
      });
    }

    // check email uniqueness
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdBy = req.user?.id || "api";

    const userData = {
      ...req.body,
      password: hashedPassword, // save hashed password
      role: role || "user",
      createdBy,
    };

    const user = await User.create(userData);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to create user" });
  }
};

// POST /api/users/signup
// Public signup for patient (role = user)
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      phone,
      address,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: "firstName, lastName, email and password are required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user", // signup only user (patient)
      dob: dob || null,
      gender: gender || null,
      phone: phone || "",
      address: address || "",
      createdBy: "signup",
    });

    const token = createToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.doctorInfo?.profilePicture
      },
      token,
    });
  } catch (error) {
    console.error("signup error:", error);
    res.status(500).json({ error: "Failed to signup" });
  }
};

// POST /api/users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    const token = createToken(user);

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.doctorInfo?.profilePicture
      },
      token,
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// PUT /api/users/:userId
// - admin & doctor: can update any user
// - normal user: only update themselves
// - only admin can change role/status
// - supports toggleStatus for admin
// - CANNOT update password here
const update = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user; // { id, role }

    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Normal user can only update themselves
    if (requester.role === "user" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own profile" });
    }

    // Admin toggle status shortcut: { toggleStatus: true }
    if (req.body.toggleStatus && requester.role === "admin") {
      const existing = await User.findById(userId);
      if (!existing) {
        return res.status(404).json({ message: "User not found" });
      }

      // status is boolean
      existing.status = !existing.status;
      existing.modifiedBy = requester.id;

      const saved = await existing.save({ validateBeforeSave: false });
      const obj = saved.toObject();
      delete obj.password;

      return res.json(obj);
    }

    const updateData = { ...req.body };

    //  never allow password change in this endpoint
    delete updateData.password;

    // Only admin is allowed to change role or status directly
    if (requester.role !== "admin") {
      delete updateData.role;
      delete updateData.status;
      delete updateData.createdBy;
    }

    updateData.modifiedBy = requester.id || "api";

    const updated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// PUT /api/users/:userId/password
// - user/doctor: change password of themselves (need currentPassword + newPassword)
// - admin: change password of any user (need newPassword only)
const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters" });
  }

  try {
    const requester = req.user;

    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // user/doctor can only change password of themselves
    if (requester.role !== "admin" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "You can only change your own password" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If not admin → must check currentPassword
    if (requester.role !== "admin") {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required" });
      }

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
    }

    // Set new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.modifiedBy = requester.id || "api";

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("changePassword error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

// DELETE /api/users/:userId
// Only admin (checked in routes with requireRole("admin"))
const remove = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  signup,
  login,
  getPublicDoctors,
  changePassword,
};
