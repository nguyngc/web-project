const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bannerController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Public
// GET /api/banners?active=true&q=kw
router.get("/", ctrl.getAll);

// GET /api/banners/:bannerId
router.get("/:bannerId", ctrl.getById);

// Admin only

// POST /api/banners
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/banners/reorder
// body: [{ id, order }, ...]
router.put(
  "/reorder",
  requireAuth,
  requireRole("admin"),
  ctrl.reorder
);

// PUT /api/banners/:bannerId
router.put(
  "/:bannerId",
  requireAuth,
  requireRole("admin"),
  ctrl.update
);

// DELETE /api/banners/:bannerId
router.delete(
  "/:bannerId",
  requireAuth,
  requireRole("admin"),
  ctrl.remove
);

// PATCH /api/banners/:bannerId/toggle
router.patch(
  "/:bannerId/toggle",
  requireAuth,
  requireRole("admin"),
  ctrl.toggle
);

module.exports = router;
