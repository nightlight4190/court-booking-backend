const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Validate required fields
    const {
      UserID,
      CourtID,
      ScheduleID,
      BookingDate,
      BookingStartDate,
      BookingEndDate,
      DayID,
      TotalPrice,
    } = req.body;
    if (
      !UserID ||
      !CourtID ||
      !ScheduleID ||
      !BookingDate ||
      !BookingStartDate ||
      !BookingEndDate ||
      !DayID ||
      !TotalPrice
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the booking
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.update(req.body, {
      where: { BookingID: req.params.id },
    });
    if (!updated[0])
      return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const canceled = await Booking.destroy({
      where: { BookingID: req.params.id },
    });
    if (!canceled) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
