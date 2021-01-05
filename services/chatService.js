const Chats = require("../models/chat");
const Users = require("../models/user");

module.exports = {
  saveMessage: async ({ message, userId, roomId }) => {
    const user = await Users.findById(userId);
    if (!user) {
      return null;
    }
    const chat = new Chats({
      text: message,
      user: user,
      roomId: roomId,
      create_At: Date.now(),
    });
    return chat.save();
  },
  getMessageByRoomId: (req, res, next) => {
    const roomId = req.params.roomId;
    Chats.find({ roomId: roomId })
      .sort({ create_At: -1 })
      .limit(10)
      .then((data) => {
        return res.json(200, data);
      })
      .catch((err) => {
        return res.json(500, err);
      });
  },
};
