const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.get("/", ctrl.getAll);              // ?q=kw&role=doctor&status=active
router.get("/:userId", ctrl.getById);
router.post("/", ctrl.create);             // { firstName, lastName, email, password, ... }
router.put("/:userId", ctrl.update);
router.delete("/:userId", ctrl.remove);

module.exports = router;
