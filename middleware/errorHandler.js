const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging

  // Send error response to client
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
};

module.exports = errorHandler;
