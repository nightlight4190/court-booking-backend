const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers); // Add this route to fetch all users
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
