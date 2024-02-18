const express = require("express");
const cachingMiddleware = require("./cachingmiddleware");
const app = express();

app.use("/testcache", cachingMiddleware);

app.get("/testcache", (req, res) => {
  res.send("Test response");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
