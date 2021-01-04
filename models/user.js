const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  avatar: String,
  username: String,
  password: String,
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

module.exports = mongoose.model("User", userSchema);
