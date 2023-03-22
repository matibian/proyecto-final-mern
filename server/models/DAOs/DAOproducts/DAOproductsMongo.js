const mongoose = require("mongoose");
const productModel = require("../../mongoModels/productModel");

class DAOProductsMongo {
  constructor() {
    this.model = mongoose.model("productos", productModel);
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
    return products;
  }
}

// const DAOproductMongo = new DAOProductsMongo();

module.exports = DAOProductsMongo;

// const { optionsMYSQL } = require("../options/mysql.js");
// const knex = require("knex")(optionsMYSQL);

// class ProductContainer {
//   constructor(table) {
//     this.table = table;
//   }

//   getAll = async () => {
//     try {
//       const productos = await knex(this.table).select("*");
//       if (productos.length > 0) {
//         return productos;
//       } else {
//         return [];
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     //   finally {
//     //     knex.destroy()
//     // };
//   };

//   save = async (producto) => {
//     await knex(this.table)
//       .insert(producto)
//       .then(() => console.log("registro creado:", producto))
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//     // .finally(()=> {
//     //   knex.destroy()
//     // })
//   };

//   // getById = async (id) => {
//   //   await knex
//   //   .from(this.table)
//   //   .select("id", "=", id)
//   //   .then(() => console.log("registro creado:", producto))
//   //   .catch((err) => {console.log(err); throw err;})
//   //   // .finally(()=> {
//   //   //   knex.destroy()
//   //   // })
//   // };

//   deleteById = async (id) => {
//     try {
//       await   (this.table)
//         .where("id", id)
//         .del()
//         .then(() => console.log("Producto eliminado"));
//     } catch (e) {
//       console.log(e);
//     }
//     // knex(this.table)
//     //   .where("id", "=", id)
//     //   .del()
//     //   .then(() => console.log("Producto eliminado"))
//     //   .catch((err) => {console.log(err); throw err;})
//     //   .finally(()=> {
//     //     knex.destroy()
//     //   })
//   };

//   // updateById = async (id, name, price) => {
//   //   try {
//   //     const productos = await this.getAll();
//   //     const item = productos.find((prod) => prod.id === Number(id));
//   //     if (item) {
//   //       item.name = name;
//   //       item.price = price;
//   //       const dataJSON = JSON.stringify(productos);
//   //       // item.thumbnail = thumbnail;
//   //       await fs.promises.writeFile("./api/productos.json", dataJSON);
//   //       return item;
//   //     } else {
//   //       return { error: "Producto no encontrado" };
//   //     }
//   //   } catch (error) {
//   //     throw new Error(error);
//   //   }
//   // };

//   deleteAll = async () => {
//     knex
//       .from(this.table)
//       .del()
//       .then(() => console.log("Productos eliminados"))
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       })
//       .finally(() => {
//         knex.destroy();
//       });
//   };
// }

// const DAOproducts = new ProductContainer("productos");

// module.exports = DAOproducts;
