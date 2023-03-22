const DAOproductsMongo = require("./DAOproductsMongo");
const DAOproductsMem = require("./DAOproductsMem");

let DAO;

modo = process.argv[3];

switch (modo) {
  case "dev":
    DAO = new DAOproductsMem();
    console.log("DAO Dev");
    break;
  case "test":
    DAO = new DAOproductsMem();
    console.log("DAO test");
    break;
  case "prod":
    DAO = new DAOproductsMongo();
    console.log("DAO prod");
    break;
  default:
    DAO = new DAOproductsMongo();
    break;
}

module.exports = DAO;
