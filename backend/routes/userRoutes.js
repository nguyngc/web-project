const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

// Auth routes (public, no token needed)

// POST /api/users/signup
// - Patient signup (role = "user")
router.post("/signup", ctrl.signup);

// POST /api/users/login
// - Login, returns { user, token }
router.post("/login", ctrl.login);

//  From here down: token required (requireAuth)

// GET /api/users
// - admin & doctor can list users (patients)
router.get("/", requireAuth, requireRole("admin", "doctor"), ctrl.getAll);

// GET /api/users/:userId
// - admin & doctor: can view any user
// - normal user: can only view themselves (checked in controller)
router.get("/:userId", requireAuth, ctrl.getById);

// POST /api/users
// - admin can create user/doctor/admin
// - if role = "doctor", can send doctorInfo in body
router.post("/", requireAuth, requireRole("admin"), ctrl.create);

// PUT /api/users/:userId
// - admin & doctor: can update any user
// - normal user: can only update themselves (checked in controller)
// - admin can also toggle status or change role
router.put("/:userId", requireAuth, ctrl.update);

// DELETE /api/users/:userId
// - only admin can delete user
router.delete("/:userId", requireAuth, requireRole("admin"), ctrl.remove);

module.exports = router;
