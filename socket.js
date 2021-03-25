module.exports = (io) => {
  // socker io
  const { roomService, chatService } = require("./services");
  io.on("connection", (socket) => {
    console.log(socket.id + ": connected");
    socket.on("test connect", (req) => {
      socket.emit("send connect", req);
    });
    // create room
    socket.on("create room", (res) => {
      console.log(res);
      roomService
        .createRoom(res)
        .then((data) => {
          socket.join(data.roomCode);
          socket.emit("chat", data);
        })
        .catch((err) => {
          socket.emit("error", err);
        });
    });

    // join room exist
    socket.on("join room", (res) => {
      console.log(res);
      roomService
        .joinRoom(res)
        .then((data) => {
          socket.join(data.roomCode);
          // send message join
          console.log(data);
          socket.to(data.roomCode).emit("join", {
            message: `${res.userId} has joined`,
          });
        })
        .catch((err) => {
          socket.emit("error", err);
        });
    });

    // send message
    socket.on("send message", (req) => {
      console.log(req);
      chatService
        .saveMessage(req)
        .then((data) => {
          io.in(req.roomCode).emit("get message", data);
        })
        .catch((err) => {
          socket.emit("error", err);
        });
    });
    socket.on("disconnect", function () {
      console.log(socket.id + ": disconnected");
    });
  });
};
