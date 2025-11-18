const mongoose = require("mongoose");
const ArticleCategory = require("../models/articleCategoryModel");

const getAll = async (req, res) => {
  const { q } = req.query;

  try {
    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.name = regex;
    }

    const categories = await ArticleCategory.find(filter).sort({ createdDateTime: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
};

const getById = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }

  try {
    const category = await ArticleCategory.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve category" });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const createdBy = req.user?.id || "api";
    const category = await ArticleCategory.create({ name, createdBy });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

const update = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }

  try {
    const modifiedBy = req.user?.id || "api";
    const updateData = { ...req.body, modifiedBy };

    const updated = await ArticleCategory.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

const remove = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }

  try {
    const deleted = await ArticleCategory.findByIdAndDelete(categoryId);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = { getAll, getById, create, update, remove };