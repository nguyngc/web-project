const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Auth routes (public, no token required)

// POST /api/users/signup
// Register a new user (patient). Returns user data + JWT token.
router.post("/signup", ctrl.signup);

// POST /api/users/login
// Log in an existing user. Returns user data + JWT token.
router.post("/login", ctrl.login);

// All routes below this line require a valid JWT (requireAuth)

// PUT /api/users/:userId/password
// Change user's password.
// - Normal user: can change their own password only.
router.put("/:userId/password", requireAuth, ctrl.changePassword);

// PATCH /api/users/:userId/status
// Toggle user's active/inactive status.
// Accessible by: admin.
router.patch(
  "/:userId/status",
  requireAuth,
  requireRole("admin"),
  ctrl.toggleStatus
);

// GET /api/users
// Get list of users (patients).
// Accessible by: admin, doctor.
router.get("/", requireAuth, requireRole("admin", "doctor"), ctrl.getAll);

// GET /api/users/:userId
// Get details of a specific user.
// - Admin & doctor: can view any user
// - Normal user: can only view their own profile (handled in controller)
router.get("/:userId", requireAuth, ctrl.getById);

// POST /api/users
// Create a new user/doctor/admin from the backend.
// Accessible by: admin.
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/users/:userId
// Update user information.
// - Admin & doctor: can update any user
// - Normal user: can only update their own profile (handled in controller)
router.put("/:userId", requireAuth, ctrl.update);

// DELETE /api/users/:userId
// Delete a user account.
// Accessible by: admin.
router.delete("/:userId", requireAuth, requireRole("admin"), ctrl.remove);

module.exports = router;
