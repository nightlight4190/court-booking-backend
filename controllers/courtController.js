const Court = require("../models/court");

// Add a new court
exports.addCourt = async (req, res) => {
  try {
    // Input validation: check if required fields are present
    const { UserID, CourtName, Location, CourtSize, PricePerHour } = req.body;

    if (!CourtName || !Location) {
      return res
        .status(400)
        .json({ error: "CourtName and Location are required" });
    }

    // Create the court record
    const court = await Court.create({
      UserID,
      CourtName,
      Location,
      CourtSize,
      PricePerHour,
    });

    res.status(201).json(court); // Respond with the created court
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: error.errors.map((err) => err.message).join(", ") });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all courts
exports.getAllCourts = async (req, res) => {
  try {
    const courts = await Court.findAll();
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get court by ID
exports.getCourtById = async (req, res) => {
  try {
    const court = await Court.findByPk(req.params.id);
    if (!court) return res.status(404).json({ error: "Court not found" });
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update court
exports.updateCourt = async (req, res) => {
  try {
    const updated = await Court.update(req.body, {
      where: { CourtID: req.params.id },
    });
    if (!updated[0]) return res.status(404).json({ error: "Court not found" });
    res.status(200).json({ message: "Court updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete court
exports.deleteCourt = async (req, res) => {
  try {
    const deleted = await Court.destroy({ where: { CourtID: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Court not found" });
    res.status(200).json({ message: "Court deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
