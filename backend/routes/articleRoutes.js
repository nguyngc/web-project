const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleController");

router.get("/", ctrl.getAll); // ?isPublished=true&q=keyword
router.get("/:articleId", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:articleId", ctrl.update);
router.delete("/:articleId", ctrl.remove);

module.exports = router;