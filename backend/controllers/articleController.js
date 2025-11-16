const Article = require("../models/articleModel");

const getAll = (req, res) => {
  const list = Article.getAll({ published: req.query.published, q: req.query.q });
  res.json(list);
};

const getById = (req, res) => {
  const a = Article.findById(req.params.articleId);
  if (!a) return res.status(404).json({ message: "Article not found" });
  res.json(a);
};

const create = (req, res) => {
  const created = Article.addOne(req.body, req.user?.id || "api");
  if (!created) return res.status(400).json({ message: "title & content are required" });
  res.status(201).json(created);
};

const update = (req, res) => {
  const updated = Article.updateOneById(req.params.articleId, req.body, req.user?.id || "api");
  if (!updated) return res.status(404).json({ message: "Article not found" });
  res.json(updated);
};

const remove = (req, res) => {
  const ok = Article.deleteOneById(req.params.articleId);
  if (!ok) return res.status(404).json({ message: "Article not found" });
  res.json({ message: "Deleted" });
};

const toggle = (req, res) => {
  const a = Article.togglePublished(req.params.articleId);
  if (!a) return res.status(404).json({ message: "Article not found" });
  res.json(a);
};

module.exports = { getAll, getById, create, update, remove, toggle };