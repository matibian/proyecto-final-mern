const express = require("express");
const passport = require("passport");
const routerAuth = express.Router();
const { registerUser, loginUser, getUser } = require("../controller/auth");
const { auth } = require("../middlewares/auth");

routerAuth.post("/signup", registerUser);
routerAuth.post("/login", loginUser);
routerAuth.post("/getuser", getUser);
routerAuth.get("/user", auth, getUser);

module.exports = routerAuth;
