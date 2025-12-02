const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Public
// GET /api/services?q=kw&isActive=true
router.get("/", ctrl.getAll);

// GET /api/services/:serviceId
router.get("/:serviceId", ctrl.getById);

// Admin-only
// POST /api/services
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/services/:serviceId
router.put("/:serviceId", requireAuth, requireRole("admin"), ctrl.update);

// DELETE /api/services/:serviceId
router.delete("/:serviceId", requireAuth, requireRole("admin"), ctrl.remove);

// PATCH /api/services/:serviceId/toggle
router.patch(
  "/:serviceId/toggle",
  requireAuth,
  requireRole("admin"),
  ctrl.toggle
);

module.exports = router;
