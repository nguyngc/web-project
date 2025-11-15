const mongoose = require("mongoose");
const DoctorInfo = require("../models/doctorInfoModel");

const getAll = async (req, res) => {
  const { q } = req.query;

  try {
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ specialization: regex }, { education: regex }];
    }

    const doctorInfos = await DoctorInfo.find(filter).populate("userId").sort({ createdDateTime: -1 });
    res.json(doctorInfos);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor infos" });
  }
};


const getByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const doctorInfo = await DoctorInfo.findOne({ userId }).populate("userId");
    if (!doctorInfo) return res.status(404).json({ message: "Doctor info not found" });
    res.json(doctorInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor info" });
  }
};

const create = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const doctorInfo = await DoctorInfo.create(req.body);

    res.status(201).json(doctorInfo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Doctor info already exists for this user" });
    }
    res.status(500).json({ message: "Failed to create doctor info" });
  }
};

const update = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const updated = await DoctorInfo.findOneAndUpdate({ userId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Doctor info not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor info" });
  }
};

const remove = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const deleted = await DoctorInfo.findOneAndDelete({ userId });
    if (!deleted) return res.status(404).json({ message: "Doctor info not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor info" });
  }
};

module.exports = { getAll, getByUserId, create, update, remove };
