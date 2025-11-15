const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/doctorInfoController");

router.get("/", ctrl.getAll);                      // ?q=kw
router.get("/user/:userId", ctrl.getByUserId);     // Lấy doctor info theo userId
router.post("/", ctrl.create);                     // { userId, specialization, ... }
router.put("/user/:userId", ctrl.update);          // Update theo userId
router.delete("/user/:userId", ctrl.remove);       // Delete theo userId

module.exports = router;
