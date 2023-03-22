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

routerProducts.get("/", routes.getProducts);

routerProducts.get("/:category", routes.getCategory);

routerProducts.get("/id/:id", routes.getById);

routerProducts.delete("/:id", routes.delProducts);

routerProducts.post("/", routes.postProducts);

module.exports = routerProducts;
