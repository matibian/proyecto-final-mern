const express = require("express");
const routerAuth = express.Router();
const { registerUser, loginUser, getUser } = require("../controller/auth");
const { auth } = require("../middlewares/auth");

routerAuth.post("/signup", registerUser);
routerAuth.post("/login", loginUser);
routerAuth.get("/user", auth, getUser);
routerAuth.get("/prueba", async (req, res) => {
  const token = await req.headers["x-access-token"];
  console.log(token);
});

module.exports = routerAuth;
