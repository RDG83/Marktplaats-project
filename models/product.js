const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
  price: Number,
  minprice: Number
});

module.exports = mongoose.model("Product", productSchema);
