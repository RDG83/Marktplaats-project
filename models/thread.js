const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
 product: {
  id: {
   type: mongoose.Schema.ObjectId,
   ref: "Product"
  }
 },
 users: [
  {
   username: String,
   id: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
   }
  }
 ],
 messages: [
  {
   type: mongoose.Schema.ObjectId,
   ref: "Message"
  }
 ]
});

module.exports = mongoose.model("Thread", threadSchema)