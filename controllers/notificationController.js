const Notification = require("../models/Notification");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update notification
exports.updateNotification = async (req, res) => {
  try {
    const updated = await Notification.update(req.body, {
      where: { NotificationID: req.params.id },
    });
    if (!updated[0])
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json({ message: "Notification updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.destroy({
      where: { NotificationID: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
