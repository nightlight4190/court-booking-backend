const express = require("express");
const router = express.Router();
const dayController = require("../controllers/dayController");

router.post("/", dayController.addDay);
router.get("/", dayController.getAllDays);
router.get("/:id", dayController.getDayById);
router.put("/:id", dayController.updateDay);
router.delete("/:id", dayController.deleteDay);

module.exports = router;
