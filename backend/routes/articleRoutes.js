const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// GET /api/articles
// Public: list articles (optional ?q=kw&isActive=true)
router.get("/", ctrl.getAll);

// GET /api/articles/:articleId
// Public: get single article by id
router.get("/:articleId", ctrl.getById);

// POST /api/articles
// Protected: only admin can create article
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/articles/:articleId
// Protected: only admin can update article
router.put("/:articleId", requireAuth, requireRole("admin"), ctrl.update);

// DELETE /api/articles/:articleId
// Protected: only admin can delete article
router.delete("/:articleId", requireAuth, requireRole("admin"), ctrl.remove);

module.exports = router;
