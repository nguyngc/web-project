const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/doctorTimeController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Public routes

// GET /api/doctor-time?userId=xxx&week=2025-W03&date=2025-01-20&status=active
router.get("/", ctrl.getAll);

// GET /api/doctor-time/user/:userId/date/:date
// Get schedule of a doctor by userId and date
router.get("/user/:userId/date/:date", ctrl.getByUserIdAndDate);

// GET /api/doctor-time/:doctorTimeId
router.get("/:doctorTimeId", ctrl.getById);

// Protected routes

// POST /api/doctor-time
// - Doctor: create their own schedule
// - Admin: create for any doctor
router.post("/", requireAuth, requireRole("doctor", "admin"), ctrl.create);

// PUT /api/doctor-time/:doctorTimeId
// - Doctor: update own schedule
// - Admin: update any schedule
router.put(
  "/:doctorTimeId",
  requireAuth,
  requireRole("doctor", "admin"),
  ctrl.update
);

// DELETE /api/doctor-time/:doctorTimeId
// - Doctor: delete own schedule
// - Admin: delete any schedule
router.delete(
  "/:doctorTimeId",
  requireAuth,
  requireRole("doctor", "admin"),
  ctrl.remove
);

// PATCH /api/doctor-time/:doctorTimeId/toggle/:slotName
// Toggle one slot (slot1-4)
router.patch(
  "/:doctorTimeId/toggle/:slotName",
  requireAuth,
  requireRole("doctor", "admin"),
  ctrl.toggleSlot
);

module.exports = router;
