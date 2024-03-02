const express = require("express");
const authenticateAndAuthorize = require("./authenticateAndAuthorizeMiddleware");

const app = express();

app.get("/admin", authenticateAndAuthorize, (req, res) => {
  res.send("Welcome, admin!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
