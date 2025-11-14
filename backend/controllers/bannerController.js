const Banner = require("../models/bannerModel");

const getAll = (req, res) => {
  const list = Banner.getAll({ active: req.query.active, q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const b = Banner.findById(req.params.bannerId);
  if (!b) return res.status(404).json({ message: "Banner not found" });
  res.json(b);
};

const create = (req, res) => {
  const created = Banner.addOne(req.body, req.user?.id || "api");
  if (!created) return res.status(400).json({ message: "image & title are required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = Banner.updateOneById(req.params.bannerId, req.body, req.user?.id || "api");
  if (!updated) return res.status(404).json({ message: "Banner not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = Banner.deleteOneById(req.params.bannerId);
  if (!ok) return res.status(404).json({ message: "Banner not found" });
  res.json({ message: "Deleted" });
};

// toggle isActive
const toggle = (req, res) => {
  const b = Banner.toggleActive(req.params.bannerId);
  if (!b) return res.status(404).json({ message: "Banner not found" });
  res.json(b);
};

// Reorder: body = [{ id, order }, ...]
const reorder = (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Body must be an array [{id, order}]" });
  }
  const list = Banner.bulkReorder(req.body);
  if (!list) return res.status(400).json({ message: "Invalid ids/orders" });
  res.json(list);
};

module.exports = { getAll, getById, create, update, remove, toggle, reorder };
