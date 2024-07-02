const route = require('express').Router();

const {
    createTPController,
    userController
} = require('../controllers/appControllers')


route.post('/Tp/create' , createTPController().create);
route.get('/Tp/read' , createTPController().read);
route.post('/Tp/update' , createTPController().update)

module.exports = route;