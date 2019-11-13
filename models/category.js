const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: String,
  products: [ {type : mongoose.Schema.ObjectId, ref : 'Product'} ]
});

module.exports = mongoose.model("Category", categorySchema);
