const DAOmessages = require("../models/DAOs/DAOmessajes/factoryDAOSmessages");
const moment = require("moment");
const timestamp = moment().format("lll");

async function websocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("msg-list", await DAOmessages.getAll("matubianchi@gmail.com"));

    socket.on("msg", async (data) => {
      try {
        console.log(data);
        let username = data.username;
        await DAOmessages.save({
          socketid: socket.id,
          username: username,
          message: data.message,
          timestamp: timestamp,
        });

        console.log("Se recibio un msg nuevo", "msg:", data.message);

        io.emit("msg-list", await DAOmessages.getAll(username));
      } catch (e) {
        console.log(err);
      }
    });
  });
}
module.exports = websocket;
