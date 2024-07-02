const route = require("express").Router();

const { loginUser, signupUser , generate } = require("../controllers/userControllers");

route.post("/login", loginUser);

route.post("/signup", signupUser);

route.post('/generate'  , generate );
module.exports = route;
