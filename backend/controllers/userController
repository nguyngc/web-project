const mongoose = require("mongoose");
const User = require("../models/userModel");
const DoctorInfo = require("../models/doctorInfoModel");

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

    res.json(usersWithDoctorInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};


const getnam = async (req, res) => {
  const { userId } = req.params;


}


const getById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "doctor") {
      const doctorInfo = await DoctorInfo.findOne({ userId: user._id }).lean();
      user.doctorInfo = doctorInfo || null;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "firstName, lastName, email & password are required" });
    }

    const createdBy = req.user?.id || "api";

    const user = await User.create({
      ...req.body,
      createdBy
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to create user" });
  }
};

const update = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const modifiedBy = req.user?.id || "api";
    const updateData = { ...req.body, modifiedBy };

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

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

module.exports = { getAll, getById, create, update, remove };
