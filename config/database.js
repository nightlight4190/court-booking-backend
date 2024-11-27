const { Sequelize } = require("sequelize");

// Load environment variables
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "court_booking", // Database name (fallback to 'court_booking')
  process.env.DB_USER || "root", // Database user (fallback to 'root')
  process.env.DB_PASSWORD || "root", // Database password (fallback to 'root')
  {
    host: process.env.DB_HOST || "localhost", // Database host (fallback to 'localhost')
    dialect: "mysql", // Dialect for MySQL
    logging: false, // Disable logging (optional)
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
