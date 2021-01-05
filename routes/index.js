var express = require("express");
var router = express.Router();

const { userService, roomService, chatService } = require("../services/");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", userService.addUser);
router.post("/signin", userService.login);
router.get("/user/:id", userService.getUserById);
router.get("/room/:userId", roomService.getRoomsByUserId);
router.get("/chat/:roomId", chatService.getMessageByRoomId);

module.exports = router;
