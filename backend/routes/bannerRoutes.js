const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bannerController");

router.get("/", ctrl.getAll);              // ?active=true&q=kw
router.get("/:bannerId", ctrl.getById);

router.post("/", ctrl.create);             // { image, title, ... }

router.put("/reorder", ctrl.reorder);      // body: [{id, order}, ...]

router.put("/:bannerId", ctrl.update);
router.delete("/:bannerId", ctrl.remove);
router.patch("/:bannerId/toggle", ctrl.toggle);

module.exports = router;
