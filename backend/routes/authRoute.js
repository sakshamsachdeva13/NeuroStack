const route = require("express").Router();
const passwordGenerator = require("../middlewares/passwordHashGenerator");
const {
  loginUser,
  signupUser,
  generate,
  forgotPassword,
  getResetPassword,
  postResetPassword,
} = require("../controllers/userControllers");

route.post("/login", loginUser);

route.post("/signup", passwordGenerator, signupUser);

route.post("/generate", generate);

route.get("/reset-password/:id/:token", getResetPassword);
route.post("/reset-password", postResetPassword);
route.post("/forgot-password", forgotPassword);
module.exports = route;
