const jwt = require("jsonwebtoken");

// Authentication middleware for verifying JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key from .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your .env
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
