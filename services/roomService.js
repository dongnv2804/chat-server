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
        return res.json(200, {
          data: data,
        });
      })
      .catch((err) => {
        return res.json(500, {
          err: err,
        });
      });
  },
  joinRoom: async ({ roomId, userId }) => {
    const room = await rooms.findById(roomId);
    if (room) {
      const newList = [...room.listUsers, ...userId];
      return rooms.updateOne(
        { _id: roomId },
        { listUsers: newList, update_At: Date.now() }
      );
    }
    return null;
  },
};
