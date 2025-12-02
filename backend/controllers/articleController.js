const mongoose = require("mongoose");
const Article = require("../models/articleModel");

const toBool = (v) => ["true", "1", true, 1, "on", "yes"].includes(v);

// GET /api/articles?q=kw&category=Eye%20Health&isPublished=true
// Public: list articles
const getAll = async (req, res) => {
  const { q, category, isPublished } = req.query;

  try {
    const filter = {};

    // filter by simple text category
    if (category) filter.category = category;

    // filter by published flag
    if (isPublished !== undefined) {
      filter.isPublished = toBool(isPublished);
    }

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { title: regex },
        { subtitle: regex },
        { content: regex },
        { category: regex },
      ];
    }

    const articles = await Article.find(filter).sort({ createdDateTime: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve articles" });
  }
};

// GET /api/articles/:articleId
// Public: get single article
const getById = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve article" });
  }
};

// POST /api/articles
// Protected: only admin can create article (enforced in routes)
const create = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const createdBy = req.user?.id || "api";

    const article = await Article.create({
      ...req.body,
      createdBy,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to create article" });
  }
};

// PUT /api/articles/:articleId
// Protected: only admin can update article
const update = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const modifiedBy = req.user?.id || "api";
    const updateData = { ...req.body, modifiedBy };

    const updated = await Article.findByIdAndUpdate(articleId, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update article" });
  }
};

// DELETE /api/articles/:articleId
// Protected: only admin can delete article
const remove = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({ message: "Invalid Article ID" });
  }

  try {
    const deleted = await Article.findByIdAndDelete(articleId);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article" });
  }
};

module.exports = { getAll, getById, create, update, remove };
