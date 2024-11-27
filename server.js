const express = require("express");
const app = express();
const sequelize = require("./config/database"); // Import Sequelize instance
require("dotenv").config();

// Import middlewares
const authenticate = require("./middleware/auth");
const logger = require("./middleware/logger"); // Only one import statement
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());
app.use(logger); // Apply logging middleware globally

// Import routes
const userRoutes = require("./routes/userRoutes");
const courtRoutes = require("./routes/courtRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const dayRoutes = require("./routes/dayRoute");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/days", dayRoutes);

// Authentication middleware applied to protected routes
app.use("/api/bookings", authenticate, bookingRoutes);
app.use("/api/ratings", authenticate, ratingRoutes);

// Sync Sequelize models with database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Error handling middleware (must be placed after routes)
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
