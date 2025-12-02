const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/faqController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Public
// GET /api/faq?q=keyword
router.get("/", ctrl.getAll);

// GET /api/faq/:faqId
router.get("/:faqId", ctrl.getById);

// Admin only
// POST /api/faq
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/faq/:faqId
router.put("/:faqId", requireAuth, requireRole("admin"), ctrl.update);

// DELETE /api/faq/:faqId
router.delete("/:faqId", requireAuth, requireRole("admin"), ctrl.remove);

module.exports = router;
