require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./userModel");
const express = require("express");
const app = express();

const mongo_url = process.env.MONGO_URL;
mongoose.connect(`${mongo_url}/30daysnodejs`);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
