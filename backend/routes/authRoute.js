const route = require('express').Router();

const { loginUser , signupUser} = require('../controllers/userControllers')


route.post('/login' , loginUser)

route.post('/signup' , signupUser)

module.exports = route;