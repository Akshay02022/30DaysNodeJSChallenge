const express = require("express");
const errorHandler = require("./errorMiddleware");

const app = express();

app.use(errorHandler);

app.get("/test-not-found", (req, res, next) => {
  const err = new Error("Resource not found");
  err.statusCode = 404;
  next(err);
});

app.get("/test-forbidden", (req, res, next) => {
  const err = new Error("Access forbidden");
  err.statusCode = 403;
  next(err);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
