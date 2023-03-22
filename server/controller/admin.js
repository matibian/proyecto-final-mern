const productService = require("../service/admin");

async function getConfig(req, res) {
  try {
    const configs = await productService.getConfigs();

    res
      .status(200)
      .render("config", { configs: configs, status: 500, layout: "config" });
  } catch (error) {
    console.log("Error: " + error);
    res
      .status(500)
      .render("error", { error: error, status: 500, layout: "error" });
  }
}

module.exports = {
  getConfig,
};
