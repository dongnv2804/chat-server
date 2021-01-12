var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

var indexRouter = require("./routes/index");

var app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log("database connect");
});

app.use("/", indexRouter);

// socker io
const { roomService, chatService } = require("./services");
io.on("connection", (socket) => {
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
        socket.broadcast.emit("join", {
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
        io.to(req.roomCode).emit("get message", data);
      })
      .catch((err) => {
        socket.emit("error", err);
      });
  });
});

module.exports = app;
