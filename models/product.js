const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
