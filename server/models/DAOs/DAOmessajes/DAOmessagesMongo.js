const mongoose = require("mongoose");
const messageModel = require("../../mongoModels/messagesModel");

class DAOmessagesMongo {
  constructor() {
    this.model = mongoose.model("mensajes", messageModel);
    // MongoDBService.init();
  }

  async getAll(username) {
    const messages = await this.model
      .find()
      .where({ username: username })
      .lean();
    return messages;
  }

  async save(element) {
    const response = await this.model.create(element);

    return response;
  }

  async getById(id) {
    const response = await this.model.findById(id);

    return response;
  }

  async deleteById(id) {
    const response = await this.collection.findByIdAndDelete(id);
    return response;
  }

  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  async getByCategory(category) {
    const products = await this.model
      .find()
      .where({ category: category })
      .lean();
    console.log(category);
    console.log(products);
    return products;
  }
}

module.exports = DAOmessagesMongo;
