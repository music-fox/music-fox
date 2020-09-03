const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/register', UserController.register)

module.exports = route