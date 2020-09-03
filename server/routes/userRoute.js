// const UserController = require('../controllers/userController')

const route = require('express').Router()

route.get('/', UserController.list)
route.post('/login', UserController.login)
route.get('/:id', UserController.showById)
route.post('/register', UserController.register)

module.exports = route