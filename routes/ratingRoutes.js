const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

// Routes
router.post("/", ratingController.addRating);
router.get("/", ratingController.getAllRatings);
router.get("/:id", ratingController.getRatingById);
router.put("/:id", ratingController.updateRating);
router.delete("/:id", ratingController.deleteRating);

module.exports = router;
