const DAOproducts = require("../models/DAOs/DAOproducts");
// const log4js = require("log4js");
// log4js.configure({
//   appenders: {
//     logConsole: { type: "console" },
//     logFile1: { type: "file", filename: "./Performance/logs/warn.log" },
//     logFile2: { type: "file", filename: "./Performance/logs/error.log" },
//   },
//   categories: {
//     default: { appenders: ["logConsole"], level: "info" },
//     fileWarn: { appenders: ["logFile1", "logConsole"], level: "warn" },
//     fileError: { appenders: ["logFile2", "logConsole"], level: "error" },
//   },
// });

// let logger = log4js.getLogger();

async function getProducts(req, res) {
  try {
    const totalProducts = await DAOproducts.getAll();
    res.status(200).json(totalProducts);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function delProducts(req, res) {
  try {
    const id = req.params.id;
    await DAOproducts.deleteById(id);
    res.status(202).send("Producto borrado");
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function postProducts(req, res) {
  try {
    const product = req.body;
    await DAOproducts.save(product);

    res.status(201).json(product);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

module.exports = {
  getProducts,
  postProducts,
  delProducts,
};
