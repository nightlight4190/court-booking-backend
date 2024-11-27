const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Court = require("./court");

const Schedule = sequelize.define("Schedule", {
  ScheduleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CourtID: {
    type: DataTypes.INTEGER,
    references: { model: Court, key: "CourtID" },
  },
  StartTime: { type: DataTypes.TIME, allowNull: false },
  EndTime: { type: DataTypes.TIME, allowNull: false },
  Availability: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Schedule;
