const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

const app = express();
const Product = require("./productModel");

function createProductRoute(req, res) {
  const { name, price, quantity } = req.body;
  const product = new Product({ name, price, quantity });
  product
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

function getAllProductsRoute(req, res) {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

function updateProductRoute(req, res) {
  const productId = req.params.id;
  const updateData = req.body;
  Product.findByIdAndUpdate(productId, updateData, { new: true })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

function deleteProductRoute(req, res) {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then(() => {
      res.json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());

app.post("/products", createProductRoute);
app.get("/products", getAllProductsRoute);
app.put("/products/:id", updateProductRoute);
app.delete("/products/:id", deleteProductRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
