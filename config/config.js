require("dotenv").config();

module.exports = {
  development: {
    username: "root", // Your database username
    password: "root", // Your database password
    database: "court_booking", // Your database name
    host: "127.0.0.1", // Database host (default localhost)
    dialect: "mysql", // Database dialect
  },
  test: {
    username: "root",
    password: "root",
    database: "court_booking_test", // Test database name
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "court_booking_production", // Production database name
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
