const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/register', UserController.register)

route.get('/', indexController.home)

module.exports = route