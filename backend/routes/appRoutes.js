const route = require("express").Router();

const {
  createTPController,
  userController,
} = require("../controllers/appControllers");

const {
  createUserConfig,
  updateUserConfig,
  getUserConfig,
} = require("../controllers/userControllers");

route.post("/Tp/create", createTPController().create);
route.post("/Tp/read", createTPController().read);
route.post("/Tp/update", createTPController().update);

route.post("/admin/create-config", createUserConfig);
route.post("/admin/get-config", getUserConfig);
route.post("/admin/update-config", updateUserConfig);

module.exports = route;
