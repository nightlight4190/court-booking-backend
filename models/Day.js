const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Day = sequelize.define("Day", {
  DayID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Sunday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Monday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Tuesday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Wednesday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Thursday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Friday: { type: DataTypes.BOOLEAN, defaultValue: false },
  Saturday: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Day;
