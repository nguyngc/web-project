const mongoose = require("mongoose");
const DoctorInfo = require("../models/doctorInfoModel");

// GET /api/doctor-info
// Public: list all doctors, optional search by specialization or education
const getAll = async (req, res) => {
  const { q } = req.query;

  try {
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ specialization: regex }, { education: regex }];
    }

    const doctorInfos = await DoctorInfo.find(filter)
      .populate("userId")
      .sort({ createdDateTime: -1 });

    res.json(doctorInfos);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor infos" });
  }
};

// GET /api/doctor-info/user/:userId
// Public: get doctor info by doctor userId
const getByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const doctorInfo = await DoctorInfo.findOne({ userId }).populate("userId");
    if (!doctorInfo) {
      return res.status(404).json({ message: "Doctor info not found" });
    }
    res.json(doctorInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor info" });
  }
};

// POST /api/doctor-info
// - Doctor: can only create their own doctorInfo (userId = req.user.id)
// - Admin: can create doctorInfo for any doctor (userId from body)
const create = async (req, res) => {
  try {
    const requester = req.user; // from requireAuth
    let { userId, specialization, licenseNumber, yoe, education, bio, profilePicture } =
      req.body;

    // If doctor, force userId to be the logged-in doctor
    if (requester.role === "doctor") {
      userId = requester.id;
    }

    if (!userId || !specialization) {
      return res
        .status(400)
        .json({ message: "userId and specialization are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Ensure only one doctorInfo per doctor
    const existing = await DoctorInfo.findOne({ userId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Doctor info already exists for this user" });
    }

    const doctorInfo = await DoctorInfo.create({
      userId,
      specialization,
      licenseNumber: licenseNumber || "",
      yoe: yoe || 0,
      education: education || "",
      bio: bio || "",
      profilePicture: profilePicture || "",
      createdBy: requester.id,
    });

    res.status(201).json(doctorInfo);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Doctor info already exists for this user" });
    }
    res.status(500).json({ message: "Failed to create doctor info" });
  }
};

// PUT /api/doctor-info/user/:userId
// - Doctor: can only update their own doctorInfo
// - Admin: can update any doctor's doctorInfo
const update = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const requester = req.user;

    const docInfo = await DoctorInfo.findOne({ userId });
    if (!docInfo) {
      return res.status(404).json({ message: "Doctor info not found" });
    }

    // Doctor can only update their own profile
    if (requester.role === "doctor" && requester.id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own profile" });
    }

    let updateData = { ...req.body };

    // Never allow changing userId / createdBy from the client
    delete updateData.userId;
    delete updateData.createdBy;

    updateData.modifiedBy = requester.id;

    const updated = await DoctorInfo.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    ).populate("userId");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor info" });
  }
};

// DELETE /api/doctor-info/user/:userId
// Only admin (enforced in routes)
const remove = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const deleted = await DoctorInfo.findOneAndDelete({ userId });
    if (!deleted) {
      return res.status(404).json({ message: "Doctor info not found" });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor info" });
  }
};

module.exports = { getAll, getByUserId, create, update, remove };
