const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/doctorInfoController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Public routes

// GET /api/doctor-info?q=kw
// List all doctors (search by specialization/education)
router.get("/", ctrl.getAll);

// GET /api/doctor-info/user/:userId
// Get doctor info by doctor userId
router.get("/user/:userId", ctrl.getByUserId);

// Protected routes

// POST /api/doctor-info
// - Doctor: create their own doctor profile
// - Admin: create for any doctor
router.post("/", requireAuth, requireRole("doctor", "admin"), ctrl.create);

// PUT /api/doctor-info/user/:userId
// - Doctor: update their own doctor profile
// - Admin: update any doctor profile
router.put(
  "/user/:userId",
  requireAuth,
  requireRole("doctor", "admin"),
  ctrl.update
);

// DELETE /api/doctor-info/user/:userId
// - Admin only
router.delete(
  "/user/:userId",
  requireAuth,
  requireRole("admin"),
  ctrl.remove
);

module.exports = router;
