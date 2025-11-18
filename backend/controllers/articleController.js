const mongoose = require("mongoose");
const Article = require("../models/articleModel");

const getAll = async (req, res) => {
  const { q, categoryId, isPublished } = req.query;

  try {
    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (isPublished !== undefined) filter.isPublished = isPublished;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { subtitle: regex }, { content: regex }];
    }

    const articles = await Article.find(filter)
      .populate("categoryId")
      .sort({ createdDateTime: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve articles" });
  }
};

const getById = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const article = await Article.findById(articleId).populate("categoryId");
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve article" });
  }
};

const create = async (req, res) => {
  try {
    const { categoryId, title, content } = req.body;
    if (!categoryId || !title || !content) {
      return res.status(400).json({ message: "categoryId, title & content are required" });
    }

    const createdBy = req.user?.id || "api";
    const article = await Article.create({ ...req.body, createdBy });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to create article" });
  }
};

const update = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const modifiedBy = req.user?.id || "api";
    const updateData = { ...req.body, modifiedBy };

    const updated = await Article.findByIdAndUpdate(articleId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update article" });
  }
};

const remove = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const deleted = await Article.findByIdAndDelete(articleId);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article" });
  }
};

module.exports = { getAll, getById, create, update, remove };
