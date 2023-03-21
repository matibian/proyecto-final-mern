const DAOcart = require("../models/DAOs/DAOcart");
const DAOusers = require("../models/DAOs/DAOusers");

// const ContUsers = new ContainerUsers();

async function postProdCart(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.postById(user, id, timestamp);
    res.status(200);
  } catch (error) {
    console.log("error: " + error);
    res.status(500);
  }
}

async function getCart(req, res) {
  try {
    let user = await ContUsers.getAll(req.session.user);
    let total = await user.cart.reduce(
      (acumulador, producto) => acumulador + producto.price * producto.quant,
      0
    );
    res.json([user.cart, total]);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function postDelProductCart(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.deleteById(user, id);
    res.status(200);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function postAdd(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.addById(user, id);
    res.status(200);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}
async function postSubs(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.subsById(user, id);
    res.status(200);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

module.exports = {
  postProdCart,
  postDelProductCart,
  postAdd,
  postSubs,
  getCart,
};
