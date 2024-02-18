const express = require("express");
const mongoose = require("mongoose");

const app = express();

function connectToMongoDB() {
  const mongoURI = "mongodb://localhost:27017/";

  mongoose.connect(mongoURI);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Successfully connected to MongoDB!");
  });
  app.get("/DBLogs", (req, res) => {
    const connectionStatus = db.readyState === 1 ? "Connected" : "Disconnected";
    res.send(`MongoDB Connection Status: ${connectionStatus}`);
  });
}
function disconnectToMongoDB() {
  mongoose
    .disconnect()
    .then(() => console.log("Successfully disconnected from MongoDB!"))
    .catch((err) =>
      console.error(`Error while disconnecting from MongoDB: ${err}`)
    );
  app.get("/DBLogs", (req, res) => {
    const connectionStatus = db.readyState === 1 ? "Connected" : "Disconnected";
    res.send(`MongoDB Connection Status: ${connectionStatus}`);
  });
}

connectToMongoDB();
disconnectToMongoDB();
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
