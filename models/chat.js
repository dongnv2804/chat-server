const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  text: String,
  user: {},
  roomId: String,
  create_At: {
    type: Date,
  },
  update_At: {
    type: Date,
  },
  delete_At: {
    type: Date,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
