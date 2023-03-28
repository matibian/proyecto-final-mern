const express = require("express");
const passport = require("passport");
const routerAuth = express.Router();
const { registerUser, loginUser, getUser } = require("../controller/auth");
const { auth } = require("../middlewares/auth");

routerAuth.post("/signup", registerUser);
routerAuth.post("/login", loginUser);
routerAuth.get("/user", auth, getUser);
routerAuth.get("/prueba", async (req, res) => {
  bla = await req.session;
  console.log(bla);
});

routerAuth.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    } else {
      return res
        .clearCookie("session-vortexs")
        .send({ succes: "Logout exitoso" });
    }
  });
});

module.exports = routerAuth;
