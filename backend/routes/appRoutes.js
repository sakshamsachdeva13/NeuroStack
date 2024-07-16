const route = require("express").Router();

const {
  createTPController,
  userController,
} = require("../controllers/appControllers");

const {
  createUserConfig,
  updateUserConfig,
  getUserConfig,
  getAllUserLists,
  getPatientData
} = require("../controllers/userControllers");

route.post("/Tp/create", createTPController().create);
route.post("/Tp/read", createTPController().read);
route.post("/Tp/update", createTPController().update);

route.post("/admin/create-config", createUserConfig);
route.get("/admin/get-config/:did/pid", getUserConfig);
route.post("/admin/update-config", updateUserConfig);
route.get("/admin/get-all-user", getAllUserLists);
route.get('/admin/get-patients/' , getPatientData)
module.exports = route;
