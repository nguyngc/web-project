const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/doctorTimeController");

router.get("/", ctrl.getAll);                                // ?userId=xxx&week=2025-W03&date=2025-01-20&status=active
router.get("/:doctorTimeId", ctrl.getById);
router.get("/user/:userId/date/:date", ctrl.getByUserIdAndDate);  // take schedule of doctor by userId and date
router.post("/", ctrl.create);                               // { userId, date, week, availableTime: {...}, ... }
router.put("/:doctorTimeId", ctrl.update);
router.delete("/:doctorTimeId", ctrl.remove);


router.patch("/:doctorTimeId/toggle/:slotName", ctrl.toggleSlot);  // Toggle slot: slot1, slot2, slot3, slot4

module.exports = router;
