require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("./productModel");

const mongo_url = process.env.MONGO_URL;

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
function createProduct(product) {
  try {
    const createProduct = Product.create(product);
    return createProduct;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
function getAllProducts() {
  try {
    const products = Product.find();
    return products;
  } catch (error) {
    console.error("Error Getting all Products :", error);
    throw error;
  }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
function updateProduct(productId, updatedProduct) {
  try {
    const product = Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    return product;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
function deleteProduct(productId) {
  try {
    const result = Product.findByIdAndDelete(productId);
    return result;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
}
mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      // const createdProduct = await createProduct({
      //   name: "Boat Headphones",
      //   price: 1800,
      //   quantity: 10,
      // });
      // console.log("Product Added : ", createdProduct);

      // const updatedProduct = await updateProduct(createdProduct._id, {
      //   price: 1500,
      // });
      // console.log("Updated Product : ", updatedProduct);

      // const deletedProduct = await deleteProduct("65d7459b4118b6c4d0c5265a");
      // console.log("Deleted Product Successfully : ", deletedProduct);

      const allProducts = await getAllProducts();
      console.log("All  products : ", allProducts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
