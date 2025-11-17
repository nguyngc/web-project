const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");

router.get("/", ctrl.getAll);              // ?q=kw&isActive=true
router.get("/:serviceId", ctrl.getById);
router.post("/", ctrl.create);             // { serviceName, shortDescription, ... }
router.put("/:serviceId", ctrl.update);
router.delete("/:serviceId", ctrl.remove);
router.patch("/:serviceId/toggle", ctrl.toggle);

module.exports = router;