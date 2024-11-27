const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: true },
    Email: { type: DataTypes.STRING, unique: true, allowNull: false },
    Phone: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING, allowNull: false },
    Role: { type: DataTypes.ENUM("customer", "admin"), allowNull: true },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.Password) {
          const hashedPassword = await bcrypt.hash(user.Password, 10);
          user.Password = hashedPassword;
        }
      },
      beforeUpdate: async (user) => {
        if (user.Password) {
          const hashedPassword = await bcrypt.hash(user.Password, 10);
          user.Password = hashedPassword;
        }
      },
    },
  }
);

module.exports = User;
