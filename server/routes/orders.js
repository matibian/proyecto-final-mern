const express = require("express");
const { Router } = express;
const routerOrders = new Router();
const routes = require("../controller/orders.js");
const { auth } = require("../middlewares/auth.js");

routerOrders.post("/checkout", routes.postCheckout);

routerOrders.get("/all", auth, routes.getCheckouts);

routerOrders.get("/:email", auth, routes.getEmail);

routerOrders.delete("/:id", routes.deleteCheckout);

module.exports = routerOrders;
