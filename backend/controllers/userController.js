const mongoose = require("mongoose");
const User = require("../models/userModel");
const DoctorInfo = require("../models/doctorInfoModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper: create JWT token for a user
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // payload: user id + role
    process.env.JWT_SECRET,           // secret stored in .env
    { expiresIn: "3d" }               // token valid for 3 days
  );
};

// GET /api/users
// Admin & doctor can retrieve the user list (authorized by route middleware).
const getAll = async (req, res) => {
  const { q, role, status } = req.query;

  try {
    const filter = {};

    if (role !== undefined) filter.role = role;
    if (status !== undefined) filter.status = status;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ firstName: regex }, { lastName: regex }, { email: regex }];
    }

    const users = await User.find(filter).sort({ createdDateTime: -1 }).lean();

    const usersWithDoctorInfo = await Promise.all(
      users.map(async (user) => {
        if (user.role === "doctor") {
          const doctorInfo = await DoctorInfo.findOne({ userId: user._id }).lean();
          return { ...user, doctorInfo: doctorInfo || null };
        }
        return user;
      })
    );

    // Remove password field in the response
    const safeUsers = usersWithDoctorInfo.map((u) => {
      const { password, ...safeUser } = u;
      return safeUser;
    });

    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// GET /api/users/:userId
// - Admin & doctor: can view any user
// - Normal user: can only view their own profile
const getById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user; // set by requireAuth middleware

    // Normal user can only access their own profile
    if (requester.role === "user" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only view your own profile" });
    }

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "doctor") {
      const doctorInfo = await DoctorInfo.findOne({ userId: user._id }).lean();
      user.doctorInfo = doctorInfo || null;
    }

    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// POST /api/users
// Admin creates a new user/doctor/admin from backend.
const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "firstName, lastName, email & password are required" });
    }

    // Check email uniqueness
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Salting + hashing password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdBy = req.user?.id || "api";

    const user = await User.create({
      ...req.body,
      password: hashedPassword, // store hashed password
      role: role || "user",
      createdBy,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to create user" });
  }
};

// POST /api/users/signup
// Public endpoint: patient signs up, gets token immediately.
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
      return res
        .status(400)
        .json({ error: "firstName, lastName, email and password are required" });
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",          // signup only creates normal user (patient)
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
      },
      token,
    });
  } catch (error) {
    console.error("signup error:", error);
    res.status(500).json({ error: "Failed to signup" });
  }
};

// POST /api/users/login
// Public endpoint: log in and receive a JWT token.
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

    // Compare plaintext password with hashed password in DB
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
      },
      token,
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// PUT /api/users/:userId
// - Admin & doctor: can update any user
// - Normal user: can only update their own basic profile fields (including email, phone)
const update = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user; // current logged-in user (from requireAuth)

    // Normal user can only update their own profile
    if (requester.role === "user" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own profile" });
    }

    let updateData = { ...req.body };

    // Never allow updating sensitive fields through this endpoint
    delete updateData.role;
    delete updateData.status;
    delete updateData.createdBy;
    delete updateData.modifiedBy;
    delete updateData.password; // password is handled via separate endpoint

    // If normal user, restrict which fields they can update
    if (requester.role === "user") {
      const allowedFields = [
        "firstName",
        "lastName",
        "dob",
        "gender",
        "phone",
        "address",
        "email", // allow user to update their own email
      ];

      const safeData = {};
      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          safeData[field] = updateData[field];
        }
      }
      updateData = safeData;
    }

    // If email is being updated, ensure uniqueness
    if (updateData.email) {
      const existingWithEmail = await User.findOne({
        email: updateData.email,
        _id: { $ne: userId }, // exclude current user
      });

      if (existingWithEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    updateData.modifiedBy = requester.id;

    const updated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "User not found" });

    const updatedObj = updated.toObject();
    delete updatedObj.password;

    res.json(updatedObj);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// PUT /api/users/:userId/password
// - Normal user: can change their own password (must provide current password)
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

    // Only allow user to change their own password
    if (requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only change your own password" });
    }

    if (!currentPassword) {
      return res
        .status(400)
        .json({ message: "Current password is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.modifiedBy = requester.id;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("changePassword error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

// PATCH /api/users/:userId/status
// Toggle user status between "active" and "inactive".
// Accessible by: admin (enforced in route via requireRole("admin")).
const toggleStatus = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user;

    // Optional: prevent admin from changing their own status
    if (requester.id === userId) {
      return res
        .status(400)
        .json({ message: "You cannot change your own status" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle between "active" and "inactive"
    user.status = user.status === "active" ? "inactive" : "active";
    user.modifiedBy = requester.id;

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: "User status updated",
      user: userObj,
    });
  } catch (error) {
    console.error("toggleStatus error:", error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

// DELETE /api/users/:userId
// Admin can delete a user account.
const remove = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });
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
  changePassword,
  toggleStatus,
};
