const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  content: String,
  parentId: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
