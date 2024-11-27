const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Court = require("./court");

const Notification = sequelize.define(
  "Notification",
  {
    NotificationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "UserID" },
    },
    CourtID: {
      type: DataTypes.INTEGER,
      references: { model: Court, key: "CourtID" },
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure a message is provided for each notification
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: "Unread", // Default status is unread
    },
    ReadStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default ReadStatus is false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Custom `CreatedAt` field
    },
  },
  {
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

module.exports = Notification;
