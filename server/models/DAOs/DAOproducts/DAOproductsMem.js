const productos = require("./productosMem");

class DAOproductsMem {
  constructor() {}

  getAll = async () => {
    return productos;
  };

  save = async (producto) => {
    try {
      const id =
        producto.length === 0 ? 1 : mensajes[mensajes.length - 1].id + 1;

      producto.id = id;

      productos.push(producto);

      console.log(`Se salvo el mensaje con el id ${id}`);
    } catch (error) {
      console.log(`Ocurrio un error: ${error}`);
    }
  };

  getByCategory = async (category) => {
    const list = await productos.filter((p) => p.category === category);
    return list;
  };

  getById = async (id) => {
    const producto = await productos.find((p) => p.id === id);
    return producto;
  };

  deleteById = async (id) => {
    productos.filter((p) => p.id !== id);
    return true;
  };

  updateById = async (id, newData) => {
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
      array[index] = { ...array[index], ...newData };
      return array[index];
    } else {
      return null;
    }
  };
}

module.exports = DAOproductsMem;
