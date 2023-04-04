const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  type: { type: String, required: false, max: 20 },
  message: { type: String, required: false },
  socketid: { type: String, required: false },
  timestamp: { type: String, required: false },
});
messageSchema.plugin(findOrCreate);

// const UsuariosProd = mongoose.model("usersprod", messageSchema);
module.exports = messageSchema;
