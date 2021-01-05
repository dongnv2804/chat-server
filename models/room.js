const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomCode: {
    type: String,
    unique,
  },
  name: String,
  avatar: String,
  joinUsers: [],
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

module.exports = mongoose.model("Room", roomSchema);
