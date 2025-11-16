const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");

const getAll = async (req, res) => {
  const { q, userId, doctorId, status, date } = req.query;

  try {
    const filter = {};

    if (userId !== undefined) filter.userId = userId;
    if (doctorId !== undefined) filter.doctorId = doctorId;
    if (status !== undefined) filter.status = status;
    if (date !== undefined) filter.date = date;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ diagnosis: regex }, { userNotes: regex }, { doctorNotes: regex }];
    }

    const appointments = await Appointment.find(filter)
      .populate("userId")
      .populate("doctorId")
      .populate("serviceId")
      .sort({ createdDateTime: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve appointments" });
  }
};





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
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve appointment" });
  }
};





const create = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({ message: "userId, doctorId, date & time are required" });
    }

    const createdBy = req.user?.id || "api";

    const appointment = await Appointment.create({
      ...req.body,
      createdBy
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
};




const update = async (req, res) => {
  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ message: "Invalid Appointment ID" });
  }

  try {
    const modifiedBy = req.user?.id || "api";
    const updateData = { ...req.body, modifiedBy };

    const updated = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Appointment not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
};



const remove = async (req, res) => {
  const { appointmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ message: "Invalid Appointment ID" });
  }

  try {
    const deleted = await Appointment.findByIdAndDelete(appointmentId);
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};

module.exports = { getAll, getById, create, update, remove };
