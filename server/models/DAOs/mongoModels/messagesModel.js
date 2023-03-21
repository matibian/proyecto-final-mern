const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  type: { type: String, required: true, max: 20 },
  timestamp: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 5000 },
});
UsuarioSchema.plugin(findOrCreate);

// const UsuariosProd = mongoose.model("usersprod", messageSchema);
module.exports = messageSchema;
