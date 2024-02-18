const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

// Create and export User model
module.exports = mongoose.model("User", userSchema);
