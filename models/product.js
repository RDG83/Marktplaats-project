const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  categories: [ {type : mongoose.Schema.ObjectId, ref : 'Category'} ]
});

module.exports = mongoose.model("Product", productSchema);
