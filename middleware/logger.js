const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next(); // Proceed to the next middleware or route handler
};

module.exports = logger;
