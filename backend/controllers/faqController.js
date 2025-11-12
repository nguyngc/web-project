const FAQ = require("../models/faqModel");

const getAll = (req, res) => {
  const list = FAQ.getAll({ q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const faq = FAQ.findById(req.params.faqId);
  if (!faq) return res.status(404).json({ message: "FAQ not found" });
  res.json(faq);
};

const create = (req, res) => {
  const created = FAQ.addOne(req.body, req.user?.id || "api");
  if (!created) return res.status(400).json({ message: "question & answer are required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = FAQ.updateOneById(req.params.faqId, req.body);
  if (!updated) return res.status(404).json({ message: "FAQ not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = FAQ.deleteOneById(req.params.faqId);
  if (!ok) return res.status(404).json({ message: "FAQ not found" });
  res.json({ message: "Deleted" });
};

module.exports = { getAll, getById, create, update, remove };