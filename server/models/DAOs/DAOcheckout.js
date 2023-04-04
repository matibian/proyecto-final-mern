const mongoose = require("mongoose");
const ordersModel = require("../mongoModels/ordersModel");

class DAOcheckouts {
  constructor() {
    this.model = mongoose.model("orders", ordersModel);
    // MongoDBService.init();
  }

  async getAll() {
    const products = await this.model.find({}).lean();
    return products;
  }

  async save(element) {
    const response = await this.model.create(element);
    return response;
  }

  async count() {
    const response = await this.model.countDocuments();
    return response;
  }

  async getByEmail(email) {
    const response = await this.model.find({ email }).lean();
    return response;
  }

  async deleteById(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }

  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }
}

const DAOcheckout = new DAOcheckouts();

module.exports = DAOcheckout;
