const express = require("express");
const router = express.Router();
const courtController = require("../controllers/courtController");

// Routes
router.post("/", courtController.addCourt);
router.get("/", courtController.getAllCourts);
router.get("/:id", courtController.getCourtById);
router.put("/:id", courtController.updateCourt);
router.delete("/:id", courtController.deleteCourt);

module.exports = router;
