const express = require("express");
const router = express.Router();
const controller = require("../controllers/todos");

router.get("/", controller.read);
router.post("/build", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
