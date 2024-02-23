require("dotenv").config();
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

const Category = require("./categoryModal");

const Product = require("./productModel");

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Promise<Array>} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate("category").exec();
    return products;
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
}

// Test Case
async function test() {
  try {
    await mongoose.connect(`${mongo_url}/30daysnodejs`);

    const category = await Category.create({
      name: "Electronics",
      description: "Products related to electronics",
    });

    await Product.create([
      {
        name: "Laptop",
        price: 1000,
        quantity: 10,
        category: category._id,
      },
      {
        name: "Smartphone",
        price: 500,
        quantity: 20,
        category: category._id,
      },
    ]);

    const products = await getProductsPopulatedWithCategory();
    console.log("Products with populated category details:", products);
  } catch (error) {
    console.error("Test case error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

test();
