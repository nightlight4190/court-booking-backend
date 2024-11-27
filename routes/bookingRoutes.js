const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Routes
router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;
