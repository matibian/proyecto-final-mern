const express = require("express");
const cart = express.Router();
const ContainerUsers = require("../contenedores/ContainerUsers");
const ContainerCart = require("../contenedores/ContainerCart");
const ContCart = new ContainerCart();
const ContUsers = new ContainerUsers();
const moment = require("moment");
const timestamp = moment().format("lll");

cart.get("/", async (req, res) => {
  let user = await ContUsers.getAll(req.session.user);
  // let total = await user.cart.reduce(
  //   (acumulador, producto) => acumulador + producto.price * producto.quant,
  //   0
  // );
  res.json(user);
});

cart.post("/", async (req, res) => {
  const id = req.params.id;
  const user = await ContUsers.getAll(req.session.user);
  await ContCart.postById(user, id, timestamp);
  res.json(user);
});

cart.post("/prod/:id", async (req, res) => {
  const id = req.params.id;
  const user = await ContUsers.getAll(req.session.user);
  await ContCart.deleteById(user, id);
  res.redirect("/cart");
});

cart.post("/add/:id", async (req, res) => {
  const id = req.params.id;
  const user = await ContUsers.getAll(req.session.user);
  await ContCart.addById(user, id);
  res.redirect("/cart");
});

cart.post("/subs/:id", async (req, res) => {
  const id = req.params.id;
  const user = await ContUsers.getAll(req.session.user);
  await ContCart.subsById(user, id);
  res.redirect("/cart");
});
