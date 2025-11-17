const Service = require("../models/serviceModel");

const getAll = (req, res) => {
  const list = Service.getAll({ active: req.query.active, q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const s = Service.findById(req.params.serviceId);
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json(s);
};

const create = (req, res) => {
  const created = Service.addOne(req.body, req.user?.id || "api");
  if (!created) return res.status(400).json({ message: "serviceName & price are required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = Service.updateOneById(req.params.serviceId, req.body, req.user?.id || "api");
  if (!updated) return res.status(404).json({ message: "Service not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = Service.deleteOneById(req.params.serviceId);
  if (!ok) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Deleted" });
};

const toggle = (req, res) => {
  const s = Service.toggleActive(req.params.serviceId);
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json(s);
};

module.exports = { getAll, getById, create, update, remove, toggle };