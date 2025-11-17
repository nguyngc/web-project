const Appointment = require("../models/appointmentModel");

const getAll = (req, res) => {
  const list = Appointment.getAll({ status: req.query.status, q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const a = Appointment.findById(req.params.appointmentId);
  if (!a) return res.status(404).json({ message: "Appointment not found" });
  res.json(a);
};

const create = (req, res) => {
  const created = Appointment.addOne(req.body, req.user?.id || "api");
  if (!created) return res.status(400).json({ message: "customerName, customerPhone, serviceId, appointmentDateTime are required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = Appointment.updateOneById(req.params.appointmentId, req.body, req.user?.id || "api");
  if (!updated) return res.status(404).json({ message: "Appointment not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = Appointment.deleteOneById(req.params.appointmentId);
  if (!ok) return res.status(404).json({ message: "Appointment not found" });
  res.json({ message: "Deleted" });
};

module.exports = { getAll, getById, create, update, remove };