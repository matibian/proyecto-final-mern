const express = require("express");
const { Router } = express;
const routerCart = new Router();
const routes = require("../controller/cart");

const { auth } = require("../middlewares/auth");

routerCart.get("/", auth, routes.getCart);

routerCart.post("/prod/:id", auth, routes.postProdCart);

routerCart.put("/add/:id", auth, routes.postAdd);

routerCart.put("/subs/:id", auth, routes.postSubs);

routerCart.delete("/:id", auth, routes.postDelProductCart);

module.exports = routerCart;
