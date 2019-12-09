const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
 product: {
  _id: {
   type: mongoose.Schema.ObjectId,
   ref: "Product"
  }
 },
 users: [
  {
   //_id: false,
   _id: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
   }, username: String
  }
 ],
 messages: [
  {
   author: {
    _id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
    },
    username: String
   },
   content: String,
   createdAt: { type: Date, default: Date.now },
  }
 ]
});

module.exports = mongoose.model("Thread", threadSchema);