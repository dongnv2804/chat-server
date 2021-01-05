const users = require("../models/user");
const md5 = require("md5");
module.exports = {
  addUser: async (req, res, next) => {
    const { name, username, password } = req.body;
    const result = await users.find({ username: username });
    if (result.length > 0) {
      return res.json(500, {
        message: "account already have exist!",
      });
    }
    const passwordHash = md5(password);
    const user = new users({
      name: name,
      username: username,
      password: passwordHash,
      create_At: Date.now(),
    });
    user
      .save()
      .then((data) => {
        return res.json(201, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
  login: (req, res, next) => {
    const { username, password } = req.body;
    const result = users.find({ username: username, password: md5(password) });
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
