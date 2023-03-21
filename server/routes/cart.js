const express = require("express");
const { Router } = express;
const authPassport = require("../middlewares/authPassport");
const routerCart = new Router();
const routes = require("../controller/cart");

authPassport();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

routerCart.get("/", checkAuthentication, routes.getCart);

routerCart.post("/prod/:id", checkAuthentication, routes.postProdCart);

routerCart.put("/add/:id", checkAuthentication, routes.postAdd);

routerCart.put("/subs/:id", checkAuthentication, routes.postSubs);

routerCart.delete("/:id", checkAuthentication, routes.postDelProductCart);

module.exports = routerCart;
