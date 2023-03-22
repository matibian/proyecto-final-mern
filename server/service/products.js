// const productsDAO = require("../models/DAOs/DAOproducts");
const DAO = require("../models/DAOs/DAOproducts/factoryDAOSproducts");

async function getProducts() {
  return await DAO.getAll();
}

async function getByCategory(category) {
  return await DAO.getByCategory(category);
}

async function getById(id) {
  return await DAO.getById(id);
}

async function delProducts(id) {
  return await DAO.deleteById(id);
}

async function postProducts(product) {
  return await DAO.save(product);
}

module.exports = {
  getByCategory,
  getById,
  getProducts,
  postProducts,
  delProducts,
};
