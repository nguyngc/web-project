const mongoose = require("mongoose");
const DoctorTime = require("../models/doctorTimeModel");

const getAll = async (req, res) => {
  const { userId, week, date, status } = req.query;

  try {
    const filter = {};

    if (userId !== undefined) filter.userId = userId;
    if (week !== undefined) filter.week = week;
    if (date !== undefined) filter.date = date;
    if (status !== undefined) filter.status = status;

    const doctorTimes = await DoctorTime.find(filter).populate("userId").sort({ createdDateTime: -1 });
    res.json(doctorTimes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor times" });
  }
};

const getById = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const doctorTime = await DoctorTime.findById(doctorTimeId).populate("userId");
    if (!doctorTime) return res.status(404).json({ message: "Doctor time not found" });
    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor time" });
  }
};

// take schedule of doctor by userId and date
const getByUserIdAndDate = async (req, res) => {
  const { userId, date } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const doctorTime = await DoctorTime.findOne({ userId, date }).populate("userId");
    if (!doctorTime) return res.status(404).json({ message: "Doctor time not found" });
    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor time" });
  }
};

const create = async (req, res) => {
  try {
    const { userId, date } = req.body;

    if (!userId || !date) {
      return res.status(400).json({ message: "userId & date are required" });
    }

    const doctorTime = await DoctorTime.create(req.body);

    res.status(201).json(doctorTime);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Schedule already exists for this date" });
    }
    res.status(500).json({ message: "Failed to create doctor time" });
  }
};

const update = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const updateData = { ...req.body };

    // If updating availableTime, merge with the current object
    if (updateData.availableTime) {
      const current = await DoctorTime.findById(doctorTimeId);
      if (current) {
        updateData.availableTime = { ...current.availableTime.toObject(), ...updateData.availableTime };
      }
    }

    const updated = await DoctorTime.findByIdAndUpdate(doctorTimeId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Doctor time not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor time" });
  }
};

const remove = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const deleted = await DoctorTime.findByIdAndDelete(doctorTimeId);
    if (!deleted) return res.status(404).json({ message: "Doctor time not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor time" });
  }
};

// Toggle a specific slot: PATCH /api/doctor-time/:doctorTimeId/toggle/:slotName
// slotName: slot1, slot2, slot3, slot4
const toggleSlot = async (req, res) => {
  const { doctorTimeId, slotName } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  const validSlots = ["slot1", "slot2", "slot3", "slot4"];
  if (!validSlots.includes(slotName)) {
    return res.status(400).json({ message: "Invalid slot name" });
  }

  try {
    const doctorTime = await DoctorTime.findById(doctorTimeId);
    if (!doctorTime) return res.status(404).json({ message: "Doctor time not found" });

    doctorTime.availableTime[slotName] = !doctorTime.availableTime[slotName];
    await doctorTime.save();

    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle slot" });
  }
};

module.exports = { getAll, getById, getByUserIdAndDate, create, update, remove, toggleSlot };
