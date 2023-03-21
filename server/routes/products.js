const express = require("express");
const { Router } = express;
const authPassport = require("../middlewares/authPassport");
const routerProducts = new Router();
const routes = require("../controller/products");

authPassport();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

routerProducts.get("/", checkAuthentication, routes.getProducts);

routerProducts.delete("/:id", checkAuthentication, routes.delProducts);

routerProducts.post("/", checkAuthentication, routes.postProducts);

module.exports = routerProducts;
