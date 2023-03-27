const express = require("express");
const { Router } = express;
const authPassport = require("../middlewares/authPassport");
const routerAdmin = new Router();
const routes = require("../controller/admin");
const { auth } = require("../middlewares/auth");

authPassport();

// function checkAuthentication(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// }

routerAdmin.get("/config", auth, routes.getConfig);

module.exports = routerAdmin;
