require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const User = require("./userModel");

const mongo_url = process.env.MONGO_URL;
mongoose.connect(`${mongo_url}/30daysnodejs`);

const app = express();

app.get("/average-age", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);
    res.json({ averageAge: result[0].averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
