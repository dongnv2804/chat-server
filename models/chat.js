const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: String,
  user: String,
  roomId: String,
  create_At: {
    type: Date,
    default: Date.now(),
  },
  update_At: {
    type: Date,
    default: Date.now(),
  },
  delete_At: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Chat", chatSchema);
