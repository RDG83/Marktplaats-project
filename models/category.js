const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  products: [ {type : mongoose.Schema.ObjectId, ref : 'Product'} ],
  parentId: [ {type : mongoose.Schema.ObjectId, ref : 'Category'} ]
});

module.exports = mongoose.model("Category", categorySchema);
