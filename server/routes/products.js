const express = require("express");
const { Router } = express;
const routerProducts = new Router();
const {
  getProducts,
  getCategory,
  getById,
  delProducts,
  postProducts,
} = require("../controller/products");

routerProducts.get("/", getProducts).post(postProducts);

routerProducts.delete("/:id", delProducts);

routerProducts.get("/id/:id", getById);

routerProducts.get("/:category", getCategory);

module.exports = routerProducts;
