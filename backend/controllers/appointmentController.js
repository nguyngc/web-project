const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");

// GET /api/appointments
// - admin: can see all, with optional filters
// - doctor: can see only their appointments (doctorId = req.user.id)
// - user: can see only their appointments (userId = req.user.id)
const getAll = async (req, res) => {
  const { q, userId, doctorId, status, date } = req.query;
  const requester = req.user;

  try {
    const filter = {};

    if (requester.role === "admin") {
      if (userId !== undefined) filter.userId = userId;
      if (doctorId !== undefined) filter.doctorId = doctorId;
    } else if (requester.role === "doctor") {
      filter.doctorId = requester.id;
      if (userId !== undefined) filter.userId = userId; // filter by patient
    } else {
      // normal user
      filter.userId = requester.id;
    }

    if (status !== undefined) filter.status = status;
    if (date !== undefined) filter.date = date;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { diagnosis: regex },
        { userNotes: regex },
        { doctorNotes: regex },
      ];
    }

    const appointments = await Appointment.find(filter)
      .populate("userId")
      .populate("doctorId")
      .populate("serviceId")
      .sort({ createdDateTime: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("getAll appointments error:", error);
    res.status(500).json({ message: "Failed to retrieve appointments" });
  }
};

// GET /api/appointments/:appointmentId
// - admin: view any
// - doctor: only if doctorId matches
// - user: only if userId matches
const getById = async (req, res) => {
  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ message: "Invalid Appointment ID" });
  }

  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate("userId")
      .populate("doctorId")
      .populate("serviceId");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const requester = req.user;

    if (
      requester.role === "user" &&
      appointment.userId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only view your own appointments" });
    }

    if (
      requester.role === "doctor" &&
      appointment.doctorId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only view your own appointments" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("getById appointment error:", error);
    res.status(500).json({ message: "Failed to retrieve appointment" });
  }
};

// POST /api/appointments
// - user: create appointment for themselves (userId = req.user.id)
// - doctor: create appointment where doctorId = req.user.id
// - admin: can create for any user/doctor
const create = async (req, res) => {
  try {
    const requester = req.user;

    let {
      userId,
      doctorId,
      serviceId,
      date,
      time,
      status,
      diagnosis,
      rightEye,
      leftEye,
      prescriptionNotes,
      userNotes,
      doctorNotes,
      nextAppointment,
    } = req.body;

    if (requester.role === "user") {
      userId = requester.id;
    }

    if (requester.role === "doctor") {
      doctorId = requester.id;
    }

    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({
        message: "userId, doctorId, date and time are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctorId" });
    }

    const createdBy = requester.id || "api";

    const appointment = await Appointment.create({
      userId,
      doctorId,
      serviceId: serviceId || null,
      date,
      time,
      status: status || "pending",
      diagnosis: diagnosis || "",
      rightEye: rightEye || "",
      leftEye: leftEye || "",
      prescriptionNotes: prescriptionNotes || "",
      userNotes: userNotes || "",
      doctorNotes: doctorNotes || "",
      nextAppointment: nextAppointment || null,
      createdBy,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("create appointment error:", error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// PUT /api/appointments/:appointmentId
// - user: only update own appointments (limited fields: date, time, userNotes)
// - doctor: only own appointments (medical fields + status)
// - admin: any appointment (but cannot change userId/doctorId)
const update = async (req, res) => {
  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ message: "Invalid Appointment ID" });
  }

  try {
    const requester = req.user;

    const current = await Appointment.findById(appointmentId);
    if (!current) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      requester.role === "user" &&
      current.userId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own appointments" });
    }

    if (
      requester.role === "doctor" &&
      current.doctorId.toString() !== requester.id
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own appointments" });
    }

    let updateData = { ...req.body };

    // Never allow userId/doctorId/createdBy to be changed from client
    delete updateData.userId;
    delete updateData.doctorId;
    delete updateData.createdBy;

    if (requester.role === "user") {
      const allowed = ["date", "time", "userNotes"];
      const safe = {};
      for (const key of allowed) {
        if (updateData[key] !== undefined) {
          safe[key] = updateData[key];
        }
      }
      updateData = safe;
    }

    if (requester.role === "doctor") {
      const allowed = [
        "status",
        "diagnosis",
        "rightEye",
        "leftEye",
        "prescriptionNotes",
        "doctorNotes",
        "nextAppointment",
      ];
      const safe = {};
      for (const key of allowed) {
        if (updateData[key] !== undefined) {
          safe[key] = updateData[key];
        }
      }
      updateData = safe;
    }

    updateData.modifiedBy = requester.id || "api";

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("update appointment error:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

// DELETE /api/appointments/:appointmentId
// - admin only
const remove = async (req, res) => {
  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ message: "Invalid Appointment ID" });
  }

  try {
    const deleted = await Appointment.findByIdAndDelete(appointmentId);
    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("delete appointment error:", error);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};

module.exports = { getAll, getById, create, update, remove };
