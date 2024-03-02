require("dotenv").config();
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

const Product = require("./productModel");

async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log('Index on "name" field created successfully.');
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(() => {
    console.log("Connected to MongoDB");
    createProductNameIndex();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
