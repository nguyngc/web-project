const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleCategoryController");

router.get("/", ctrl.getAll); // ?q=keyword
router.get("/:categoryId", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:categoryId", ctrl.update);
router.delete("/:categoryId", ctrl.remove);

module.exports = router;