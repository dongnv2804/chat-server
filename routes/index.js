var express = require("express");
var router = express.Router();

const userServices = require("../services/userService");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", userServices.addUser);
router.post("/signin", userServices.login);
router.get("/user/:id", userServices.getUserById);

module.exports = router;
