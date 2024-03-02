function errorHandler(err, req, res, next) {
  console.error(err.stack);
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
