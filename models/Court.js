const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Court = sequelize.define("Court", {
  CourtID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "UserID" },
  },
  CourtName: { type: DataTypes.STRING, allowNull: false },
  Location: { type: DataTypes.STRING, allowNull: false },
  CourtSize: { type: DataTypes.STRING },
  PricePerHour: { type: DataTypes.FLOAT },
});

module.exports = Court;
