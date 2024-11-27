const Rating = require("../models/Rating");

// Add a new rating
exports.addRating = async (req, res) => {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get rating by ID
exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) return res.status(404).json({ error: "Rating not found" });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update rating
exports.updateRating = async (req, res) => {
  try {
    const updated = await Rating.update(req.body, {
      where: { RatingID: req.params.id },
    });
    if (!updated[0]) return res.status(404).json({ error: "Rating not found" });
    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete rating
exports.deleteRating = async (req, res) => {
  try {
    const deleted = await Rating.destroy({
      where: { RatingID: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "Rating not found" });
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
