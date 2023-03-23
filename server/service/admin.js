async function getConfigs() {
  const modo = process.argv[3];
  const configs = {};
  configs.modo = modo;
  modo == "dev" || modo == "test"
    ? (configs.persistencia = "Memoria")
    : (configs.persistencia = "MongoDB");

  return configs;
}

// async function getByCategory(category) {
//   return await DAO.getByCategory(category);
// }

// async function getById(id) {
//   return await DAO.getById(id);
// }

// async function delProducts(id) {
//   return await DAO.deleteById(id);
// }

// async function postProducts(product) {
//   return await DAO.save(product);
// }

module.exports = {
  getConfigs,
};
