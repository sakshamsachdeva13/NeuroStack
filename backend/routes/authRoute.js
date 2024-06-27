const route = require("express").Router();

const { loginUser, signupUser } = require("../controllers/userControllers");

route.post("/login", loginUser);

route.post("/signup", signupUser);

route.get("/test", (req, res) => {
  res.send("Flow working fine");
});
module.exports = route;
