const rooms = require("../models/room");

module.exports = {
  createRoom: ({ roomCode, roomName, userId }) => {
    const listUsers = [];
    listUsers.push(userId);
    const newRoom = new rooms({
      roomCode: roomCode,
      name: roomName,
      joinUsers: listUsers,
      create_At: Date.now(),
    });
    return newRoom.save();
  },
  getRoomsByUserId: (req, res, next) => {
    const id = req.params.userId;
    rooms
      .find({ joinUsers: id })
      .then((data) => {
        return res.json(200, data);
      })
      .catch((err) => {
        return res.json(500, {
          err: err,
        });
      });
  },
  joinRoom: async ({ roomCode, userId }) => {
    const room = await rooms.findOne({ roomCode: roomCode });
    if (room) {
      const findUser = room.listUsers.find((elm) => elm === userId);
      if (findUser) {
        return new Promise((resolve, reject) => {
          resolve(room);
          reject("err");
        });
      }
      const newList = [...room.listUsers, ...userId];
      return rooms.updateOne(
        { _id: room._id },
        { listUsers: newList, update_At: Date.now() }
      );
    }
    return null;
  },
};
