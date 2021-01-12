var express = require("express");
var router = express.Router();

const { userService, roomService, chatService } = require("../services/");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/test", (req, res, next) => {
  console.log(req.query);
  res.json(200, req.query);
});

router.post("/signup", userService.addUser);
router.post("/signin", userService.login);
router.get("/user/:id", userService.getUserById);
router.get("/room/:userId", roomService.getRoomsByUserId);
router.get("/chat/:roomId", chatService.getMessageByRoomId);

module.exports = router;
