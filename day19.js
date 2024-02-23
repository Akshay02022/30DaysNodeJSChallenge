require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./userModel");

const mongo_url = process.env.MONGO_URL;
mongoose.connect(`${mongo_url}/30daysnodejs`);

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation Error:", error.message);
    } else {
      console.error("Error adding user:", error);
    }
  }
}
mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(() => {
    console.log("Connected to MongoDB");
    addUserWithValidation({
      username: "ValidUsername",
      email: "validemail@example.com",
    });
    addUserWithValidation({
      username: "InValidUsername",
      email: "invalidemailexample.com",
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
