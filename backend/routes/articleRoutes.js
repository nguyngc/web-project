const express = require("express");
const router = express.Router();
const ctrl = require("../../../web-project/backend/controllers/articleController");

router.get("/", ctrl.getAll); // ?published=true&q=kw
router.get("/:articleId", ctrl.getById);
router.post("/", ctrl.create); // { title, content, ... }
router.put("/:articleId", ctrl.update);
router.delete("/:articleId", ctrl.remove);
router.patch("/:articleId/toggle", ctrl.toggle);

module.exports = router;