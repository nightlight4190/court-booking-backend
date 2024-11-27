const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Court = require("./court");
const Schedule = require("./Schedule");
const Day = require("./Day");

const Booking = sequelize.define("Booking", {
  BookingID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "UserID" },
  },
  CourtID: {
    type: DataTypes.INTEGER,
    references: { model: Court, key: "CourtID" },
  },
  ScheduleID: {
    type: DataTypes.INTEGER,
    references: { model: Schedule, key: "ScheduleID" },
  },
  BookingDate: { type: DataTypes.DATE, allowNull: false },
  BookingStartDate: { type: DataTypes.DATE },
  BookingEndDate: { type: DataTypes.DATE },
  DayID: { type: DataTypes.INTEGER, references: { model: Day, key: "DayID" } },
  TotalPrice: { type: DataTypes.FLOAT },
  Status: {
    type: DataTypes.ENUM("reserved", "canceled", "pending"),
    defaultValue: "pending",
  },
});

module.exports = Booking;
