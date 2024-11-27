const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package

// Secret key for signing JWT token (ensure this is stored securely in your .env)
const secretKey = process.env.JWT_SECRET || "your-secret-key";

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { Name, Email, Phone, Password, Role = "customer" } = req.body;

    // Create user (password hashing happens in model hook)
    const user = await User.create({ Name, Email, Phone, Password, Role });

    // Exclude password in the response
    const { Password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user and generate JWT token
exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { UserID: user.UserID, Email: user.Email, Role: user.Role },
      secretKey,
      { expiresIn: "1h" } // Token expiration (1 hour in this case)
    );

    // Exclude password in the response
    const { Password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json({
      message: "Login successful",
      token: token, // Send the token back to the user
      user: userWithoutPassword, // Optionally, return user info excluding the password
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.update(req.body, {
      where: { UserID: req.params.id },
    });
    if (!updated[0]) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { UserID: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
