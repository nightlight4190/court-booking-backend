const jwt = require("jsonwebtoken");

// Authentication middleware for verifying JWT
const authenticate = (req, res, next) => {
  // Retrieve the Authorization header
  const tokenHeader = req.header("Authorization");

  // Check if the token exists and starts with "Bearer "
  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract the token by removing "Bearer " from the header value
  const token = tokenHeader.split(" ")[1];

  try {
    // Load the secret key from environment variables
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return res.status(500).json({
        message:
          "JWT secret is not configured. Please set JWT_SECRET in your .env file.",
      });
    }

    // Verify the token with the secret key
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message); // Debugging log
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
