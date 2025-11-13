const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/faqController");

router.get("/", ctrl.getAll);          // ?q=keyword
router.get("/:faqId", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:faqId", ctrl.update);
router.delete("/:faqId", ctrl.remove);

module.exports = router;
