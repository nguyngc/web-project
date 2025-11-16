const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");

router.get("/", ctrl.getAll); // ?active=true&q=kw
router.get("/:serviceId", ctrl.getById);
router.post("/", ctrl.create); // { serviceName, price, ... }
router.put("/:serviceId", ctrl.update);
router.delete("/:serviceId", ctrl.remove);
router.patch("/:serviceId/toggle", ctrl.toggle);

module.exports = router;