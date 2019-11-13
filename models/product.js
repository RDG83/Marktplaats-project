const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);
