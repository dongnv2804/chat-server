const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  avatar: String,
  username: String,
  password: String,
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

module.exports = mongoose.model("User", userSchema);
