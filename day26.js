require("dotenv").config();
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

const Product = require("./productModel");

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];
    const result = await Product.aggregate(pipeline);
    return result[0] || {};
  } catch (error) {
    console.error("Error calculating product statistics:", error);
    return {};
  }
}

mongoose
  .connect(`${mongo_url}/30daysnodejs`)
  .then(() => {
    console.log("Connected to MongoDB");
    getProductStatistics()
      .then((statistics) => {
        console.log("Product statistics:", statistics);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
