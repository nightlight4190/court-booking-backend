const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Court = require("./court");

const Notification = sequelize.define("Notification", {
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
  Status: { type: DataTypes.STRING },
});

module.exports = Notification;
