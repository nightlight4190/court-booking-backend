const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Court = require("./court");

const Rating = sequelize.define("Rating", {
  RatingID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "UserID" },
  },
  CourtID: {
    type: DataTypes.INTEGER,
    references: { model: Court, key: "CourtID" },
  },
  Rating: { type: DataTypes.INTEGER, allowNull: false },
  Review: { type: DataTypes.STRING },
  Status: { type: DataTypes.BOOLEAN, defaultValue: true },
  RatingDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

module.exports = Rating;
