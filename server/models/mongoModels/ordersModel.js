const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const orderModel = new mongoose.Schema({
  items: { type: Array, required: false, max: 100 },
  timestamp: { type: String, required: true, max: 100 },
  ordernumber: { type: Number, required: true },
  username: { type: String, required: true, max: 100 },
  state: { type: String, required: false },
});

UsuarioSchema.plugin(findOrCreate);

// const Products = mongoose.model("productos", productModel);
module.exports = orderModel;
