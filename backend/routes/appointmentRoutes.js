const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// GET /api/appointments?q=kw&userId=xxx&doctorId=xxx&status=pending&date=2025-01-20
router.get("/", requireAuth, ctrl.getAll);

// GET /api/appointments/:appointmentId
router.get("/:appointmentId", requireAuth, ctrl.getById);

// POST /api/appointments
router.post("/", requireAuth, ctrl.create);

// PUT /api/appointments/:appointmentId
router.put("/:appointmentId", requireAuth, ctrl.update);

// DELETE /api/appointments/:appointmentId
// admin only
router.delete(
  "/:appointmentId",
  requireAuth,
  requireRole("admin"),
  ctrl.remove
);

module.exports = router;
