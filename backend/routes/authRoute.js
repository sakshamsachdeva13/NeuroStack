const route = require("express").Router();
const passwordGenerator = require("../middlewares/passwordHashGenerator");
const {
  loginUser,
  signupUser,
  generate,
} = require("../controllers/userControllers");

route.post("/login", loginUser);

route.post("/signup", passwordGenerator, signupUser);

route.post("/generate", generate);
module.exports = route;
