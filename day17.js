require("dotenv").config();
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);
async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully:", newUser);
  } catch (error) {
    console.error("Error adding user to database:", error);
  }
}
mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(() => {
    console.log("Connected to MongoDB");
    addUserToDatabase({
      username: "Person3",
      email: "person3@example.com",
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
