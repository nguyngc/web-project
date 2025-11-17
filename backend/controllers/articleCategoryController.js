const Category = require("../models/articleCategoryModel");

const getAll = (req, res) => {
  const list = Category.getAll({ q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const c = Category.findById(req.params.categoryId);
  if (!c) return res.status(404).json({ message: "Category not found" });
  res.json(c);
};

const create = (req, res) => {
  const created = Category.addOne(req.body);
  if (!created) return res.status(400).json({ message: "name is required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = Category.updateOneById(req.params.categoryId, req.body);
  if (!updated) return res.status(404).json({ message: "Category not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = Category.deleteOneById(req.params.categoryId);
  if (!ok) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Deleted" });
};

module.exports = { getAll, getById, create, update, remove };