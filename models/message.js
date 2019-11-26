const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  content: String
});

module.exports = mongoose.model("Message", messageSchema);
