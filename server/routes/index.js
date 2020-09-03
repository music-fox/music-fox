const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/user', UserController.list)
route.get('/user/:id', UserController.showById)

route.get('/', IndexController.home)

module.exports = route