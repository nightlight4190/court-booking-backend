const Day = require("../models/Day");

// Add a new day entry
exports.addDay = async (req, res) => {
  try {
    const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } =
      req.body;
    const day = await Day.create({
      Sunday,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
    });
    res.status(201).json(day);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all days
exports.getAllDays = async (req, res) => {
  try {
    const days = await Day.findAll();
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get day by ID
exports.getDayById = async (req, res) => {
  try {
    const day = await Day.findByPk(req.params.id);
    if (!day) return res.status(404).json({ error: "Day not found" });
    res.status(200).json(day);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a day entry
exports.updateDay = async (req, res) => {
  try {
    const updated = await Day.update(req.body, {
      where: { DayID: req.params.id },
    });
    if (!updated[0]) return res.status(404).json({ error: "Day not found" });
    res.status(200).json({ message: "Day updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a day entry
exports.deleteDay = async (req, res) => {
  try {
    const deleted = await Day.destroy({ where: { DayID: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Day not found" });
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
