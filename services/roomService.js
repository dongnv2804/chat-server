const rooms = require("../models/room");

module.exports = {
  createRoom: (req, res, next) => {
    const { roomName, userId } = req.body;
    const listUsers = [];
    listUsers.push(userId);
    const newRoom = new rooms({
      name: roomName,
      joinUsers: listUsers,
    });
    newRoom
      .save()
      .then((data) => {
        return res.json(201, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
  getRoomsByUserId: (req, res, next) => {
    const id = req.params.id;
    rooms
      .find({ joinUsers: id })
      .then((data) => {
        return res.json(200, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
};
