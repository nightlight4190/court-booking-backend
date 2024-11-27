const Schedule = require("../models/Schedule");

// Add a new schedule
exports.addSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.update(req.body, {
      where: { ScheduleID: req.params.id },
    });
    if (!updated[0])
      return res.status(404).json({ error: "Schedule not found" });
    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const deleted = await Schedule.destroy({
      where: { ScheduleID: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "Schedule not found" });
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
