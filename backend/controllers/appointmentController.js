const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");

// GET /api/appointments
// - admin: can see all, with optional filters
// - doctor: can see only their appointments (doctorId = req.user.id)
// - user: can see only their appointments (userId = req.user.id)
const getAll = async (req, res) => {
  const { q, userId, doctorId, status, date } = req.query;
  const requester = req.user;
  const requesterId = requester.id || requester._id.toString();

  try {
    const filter = {};

    if (requester.role === "admin") {
      if (userId !== undefined) filter.userId = userId;
      if (doctorId !== undefined) filter.doctorId = doctorId;
    } else if (requester.role === "doctor") {
      filter.doctorId = requesterId;
      if (userId !== undefined) filter.userId = userId; // filter by patient
    } else {
      // normal user
      filter.userId = requesterId;
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
    const requesterId = requester.id || requester._id.toString();

    const userIdStr = appointment.userId._id
      ? appointment.userId._id.toString()
      : appointment.userId.toString();

    const doctorIdStr = appointment.doctorId._id
      ? appointment.doctorId._id.toString()
      : appointment.doctorId.toString();

    if (requester.role === "user" && userIdStr !== requesterId) {
      return res.status(403).json({
        message: "Forbidden: you can only view your own appointments",
      });
    }

    if (requester.role === "doctor" && doctorIdStr !== requesterId) {
      return res.status(403).json({
        message: "Forbidden: you can only view your own appointments",
      });
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
    const requesterId = requester.id || requester._id.toString();

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

    // patient: must be themselves
    if (requester.role === "user") {
      userId = requesterId;
    }

    // doctor: must be themselves
    if (requester.role === "doctor") {
      doctorId = requesterId;
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

    // CONFLICT CHECK: is this slot already booked for this doctor?
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is no longer available. Please choose another.",
      });
    }

    // Status logic:
    // - default: "pending"
    // - only admin can override on creation
    let initialStatus = "pending";
    if (requester.role === "admin" && status) {
      initialStatus = status;
    }

    // Medical fields: only doctor/admin should really set them
    const medicalPayload =
      requester.role === "user"
        ? {
            diagnosis: "",
            rightEye: "",
            leftEye: "",
            prescriptionNotes: "",
            doctorNotes: "",
            nextAppointment: null,
          }
        : {
            diagnosis: diagnosis || "",
            rightEye: rightEye || "",
            leftEye: leftEye || "",
            prescriptionNotes: prescriptionNotes || "",
            doctorNotes: doctorNotes || "",
            nextAppointment: nextAppointment || null,
          };

    const createdBy = requesterId || "api";

    const appointment = await Appointment.create({
      userId,
      doctorId,
      serviceId: serviceId || null,
      date,
      time,
      status: initialStatus,
      userNotes: userNotes || "",
      ...medicalPayload,
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
    const requesterId = requester.id || requester._id.toString();

    const current = await Appointment.findById(appointmentId);
    if (!current) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (requester.role === "user" && current.userId.toString() !== requesterId) {
      return res.status(403).json({
        message: "Forbidden: you can only update your own appointments",
      });
    }

    if (
      requester.role === "doctor" &&
      current.doctorId.toString() !== requesterId
    ) {
      return res.status(403).json({
        message: "Forbidden: you can only update your own appointments",
      });
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

    updateData.modifiedBy = requesterId || "api";

    // CONFLICT CHECK for rescheduling:
    // Only if date or time is changing (or both)
    const newDate = updateData.date || current.date;
    const newTime = updateData.time || current.time;

    const conflict = await Appointment.findOne({
      _id: { $ne: appointmentId },       // exclude this appointment
      doctorId: current.doctorId,        // same doctor
      date: newDate,
      time: newTime,
      status: { $ne: "cancelled" },      // ignore cancelled
    });

    if (conflict) {
      return res.status(400).json({
        message: "This time slot is already booked. Please choose another.",
      });
    }

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
