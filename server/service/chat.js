const { normalize, schema } = require("normalizr");
const username = VERRRRRRRRR;

const moment = require("moment");
const timestamp = moment().format("lll");

const DAOmessages = require("../models/DAOs/DAOmessajes/factoryDAOSmessages");

// Normalizr

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("messages", {
  author: authorSchema,
});

const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema],
});

const normalizarData = (data) => {
  const dataNormalizada = normalize(
    { id: "chatHistory", messages: data },
    chatSchema
  );
  return dataNormalizada;
};

const normalizarMensajes = async () => {
  const messages = await DAOmessages.getAll(username);
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;
};

///// Conexion socket

async function websocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("msg-list", await normalizarMensajes());

    socket.on("msg", async (data) => {
      await DAOmessages.save({
        socketid: socket.id,
        timestamp: timestamp,
        ...data,
      });

      console.log("Se recibio un msg nuevo", "msg:", data);

      io.emit("msg-list", await normalizarMensajes());
    });
  });
}

module.exports = websocket;
