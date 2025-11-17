const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");

router.get("/", ctrl.getAll); // ?status=Pending&q=keyword
router.get("/:appointmentId", ctrl.getById);
router.post("/", ctrl.create); // { customerName, customerPhone, serviceId, appointmentDateTime }
router.put("/:appointmentId", ctrl.update);
router.delete("/:appointmentId", ctrl.remove);

module.exports = router;