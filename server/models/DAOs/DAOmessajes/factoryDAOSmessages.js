const DAOmessagesFS = require("./DAOmessagesFS");
const DAOmessagesMem = require("./DAOmessagesMem");
const DAOmessagesMongo = require("./DAOmessagesMongo");

let DAO;

modo = process.argv[3];

switch (modo) {
  case "dev":
    DAO = new DAOmessagesMem();
    break;
  case "test":
    DAO = new DAOmessagesFS();
    break;
  case "prod":
    DAO = new DAOmessagesMongo();
    break;
  default:
    DAO = new DAOmessagesMongo();
    break;
}

module.exports = DAO;
