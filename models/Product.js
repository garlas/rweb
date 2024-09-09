// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  whatsapp: String,
});

module.exports = mongoose.model("Product", productSchema);
