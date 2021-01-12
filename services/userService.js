const users = require("../models/user");
const md5 = require("md5");
module.exports = {
  addUser: async (req, res, next) => {
    const { name, userName, password } = req.body;
    const result = await users.findOne({ username: userName });
    if (result) {
      return res.json(200, {
        message: "account already have exist!",
      });
    }
    const user = new users({
      name: name,
      username: userName,
      password: md5(password),
      create_At: Date.now(),
    });
    user
      .save()
      .then((data) => {
        return res.json(201, {
          message: "register successfully!",
        });
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
  login: (req, res, next) => {
    const { userName, password } = req.body;
    const result = users.findOne({
      username: userName,
      password: md5(password),
    });
    result
      .then((data) => {
        return res.json(200, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
  getUserById: (req, res, next) => {
    const id = req.params.id;
    users
      .findById(id)
      .then((data) => {
        return res.json(200, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
};
