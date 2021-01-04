const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  avatar: String,
  joinUsers: [],
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

module.exports = mongoose.model("Room", roomSchema);
