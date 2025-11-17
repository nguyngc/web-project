const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");

router.get("/", ctrl.getAll);              // ?q=kw&userId=xxx&doctorId=xxx&status=pending&date=2025-01-20
router.get("/:appointmentId", ctrl.getById);
router.post("/", ctrl.create);             // { userId, doctorId, serviceId, date, time, ... }
router.put("/:appointmentId", ctrl.update);
router.delete("/:appointmentId", ctrl.remove);

module.exports = router;
