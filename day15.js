const express = require("express");
const loggingMiddleware = require("./loggingmiddleware");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(loggingMiddleware);
app.get("/logs", (req, res) => {
  res.send("Hello, world!");
});
app.post("/logs", (req, res) => {
  res.send("Got some data!");
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
