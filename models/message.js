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
  parentmessage: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  parentproduct: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  }
});

module.exports = mongoose.model("Message", messageSchema);
