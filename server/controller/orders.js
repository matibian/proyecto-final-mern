const DAOcart = require("../models/DAOs/DAOcart");
const DAOusers = require("../models/DAOs/DAOusers");
const DAOcheckout = require("../models/DAOs/DAOcheckout");

async function postCheckout(req, res) {
  try {
    let order = req.body;
    let ordernumber = (await DAOcheckout.count()) + 1;
    order.ordernumber = ordernumber;
    const response = await DAOcheckout.save(order);
    res.status(200).json({ id: response._id });
  } catch (error) {
    console.log("error: " + error);
    res.status(500);
  }
}

async function getCheckouts(req, res) {
  let orders = await DAOcheckout.getAll();
  res.status(200).render("orders", { orders: orders, layout: "orders" });
}

async function deleteCheckout(req, res) {
  const id = req.params.id;
  let checkouts = await DAOcheckout.deleteById(id);
  res.status(200).json(checkouts);
}

async function getEmail(req, res) {
  const email = req.params.email;
  let orders = await DAOcheckout.getByEmail({ email });
  res.status(200).json(orders);
}

module.exports = {
  getCheckouts,
  postCheckout,
  deleteCheckout,
  getEmail,
};
