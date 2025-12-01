const mongoose = require("mongoose");
const DoctorTime = require("../models/doctorTimeModel");

// GET /api/doctor-time
// Public: list schedules (filter by userId, week, date, status)
const getAll = async (req, res) => {
  const { userId, week, date, status } = req.query;

  try {
    const filter = {};

    if (userId !== undefined) filter.userId = userId;
    if (week !== undefined) filter.week = week;
    if (date !== undefined) filter.date = date;
    if (status !== undefined) filter.status = status;

    const doctorTimes = await DoctorTime.find(filter)
      .populate("userId")
      .sort({ createdDateTime: -1 });

    res.json(doctorTimes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor times" });
  }
};

// GET /api/doctor-time/:doctorTimeId
// Public: get one schedule by id
const getById = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const doctorTime = await DoctorTime.findById(doctorTimeId).populate("userId");
    if (!doctorTime) {
      return res.status(404).json({ message: "Doctor time not found" });
    }
    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor time" });
  }
};

// GET /api/doctor-time/user/:userId/date/:date
// Public: get schedule of a doctor by userId and date
const getByUserIdAndDate = async (req, res) => {
  const { userId, date } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const doctorTime = await DoctorTime.findOne({ userId, date }).populate(
      "userId"
    );
    if (!doctorTime) {
      return res.status(404).json({ message: "Doctor time not found" });
    }
    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor time" });
  }
};

// POST /api/doctor-time
// - Doctor: create schedule for themselves
// - Admin: create schedule for any doctor (userId from body)
const create = async (req, res) => {
  try {
    const requester = req.user;
    let { userId, date, week, availableTime, status } = req.body;

    // If doctor, force userId to logged-in doctor
    if (requester.role === "doctor") {
      userId = requester.id;
    }

    if (!userId || !date) {
      return res
        .status(400)
        .json({ message: "userId & date are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const doctorTime = await DoctorTime.create({
      userId,
      date,
      week: week || "",
      availableTime: availableTime || {
        slot1: false,
        slot2: false,
        slot3: false,
        slot4: false,
      },
      status: status || "active",
      createdBy: requester.id,
    });

    res.status(201).json(doctorTime);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Schedule already exists for this date" });
    }
    res.status(500).json({ message: "Failed to create doctor time" });
  }
};

// PUT /api/doctor-time/:doctorTimeId
// - Doctor: can update their own schedule
// - Admin: can update any schedule
const update = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const requester = req.user;

    const current = await DoctorTime.findById(doctorTimeId);
    if (!current) {
      return res.status(404).json({ message: "Doctor time not found" });
    }

    // Doctor can only update their own schedule
    if (
      requester.role === "doctor" &&
      current.userId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own schedule" });
    }

    let updateData = { ...req.body };

    // If updating availableTime, merge with the current object
    if (updateData.availableTime) {
      updateData.availableTime = {
        ...current.availableTime.toObject(),
        ...updateData.availableTime,
      };
    }

    // Do not allow changing userId from client
    delete updateData.userId;
    delete updateData.createdBy;

    updateData.modifiedBy = requester.id;

    const updated = await DoctorTime.findByIdAndUpdate(
      doctorTimeId,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor time" });
  }
};

// DELETE /api/doctor-time/:doctorTimeId
// - Doctor: delete their own schedule
// - Admin: delete any schedule
const remove = async (req, res) => {
  const { doctorTimeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorTimeId)) {
    return res.status(400).json({ message: "Invalid DoctorTime ID" });
  }

  try {
    const requester = req.user;

    const current = await DoctorTime.findById(doctorTimeId);
    if (!current) {
      return res.status(404).json({ message: "Doctor time not found" });
    }

    if (
      requester.role === "doctor" &&
      current.userId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only delete your own schedule" });
    }

    await current.deleteOne();

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor time" });
  }
};

// PATCH /api/doctor-time/:doctorTimeId/toggle/:slotName
// Toggle a specific slot (slot1, slot2, slot3, slot4)
// - Doctor: can toggle their own schedule
// - Admin: can toggle any schedule
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
    const requester = req.user;

    const doctorTime = await DoctorTime.findById(doctorTimeId);
    if (!doctorTime) {
      return res.status(404).json({ message: "Doctor time not found" });
    }

    if (
      requester.role === "doctor" &&
      doctorTime.userId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only toggle your own schedule" });
    }

    doctorTime.availableTime[slotName] = !doctorTime.availableTime[slotName];
    doctorTime.modifiedBy = requester.id;

    await doctorTime.save();

    res.json(doctorTime);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle slot" });
  }
};

module.exports = {
  getAll,
  getById,
  getByUserIdAndDate,
  create,
  update,
  remove,
  toggleSlot,
};
