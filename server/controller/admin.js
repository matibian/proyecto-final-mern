const DAO = require("../models/DAOs/DAOproducts/factoryDAOSproducts");
const productService = require("../service/admin");

async function getAdmin(req, res) {
  try {
    const config = await productService.getConfigs();
    console.log(config);
    res.status(200).render("index", { config: config, layout: "index" });
  } catch (error) {
    console.log("Error: " + error);
    res
      .status(500)
      .render("error", { error: error, status: 500, layout: "error" });
  }
}

async function getAdminProductos(req, res) {
  try {
    const productos = await DAO.getAll();
    res
      .status(200)
      .render("productos", { products: productos, layout: "productos" });
  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
}

async function getChat(req, res) {
  try {
    res.status(200).render("chat", { layout: "chat" });
  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
}

async function getChatUser(req, res) {
  try {
    res.status(200).render("chat", { layout: "chat" });
  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
}

async function getConfig(req, res) {
  try {
    const config = await productService.getConfigs();
    console.log(config);
    res
      .status(200)
      .render("config", { config: config, status: 500, layout: "config" });
  } catch (error) {
    console.log("Error: " + error);
    res
      .status(500)
      .render("error", { error: error, status: 500, layout: "error" });
  }
}

module.exports = {
  getChat,
  getChatUser,
  getConfig,
  getAdmin,
  getAdminProductos,
};
