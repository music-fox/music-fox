const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')
<<<<<<< HEAD
=======
const SpotifyController = require('../controllers/musicController')
const {getSpotifyAccessToken} = require('../middlewares/spotify')
>>>>>>> spotify

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/user', UserController.list)
route.get('/user/:id', UserController.showById)

route.get('/', IndexController.home)
<<<<<<< HEAD
=======

route.use(getSpotifyAccessToken)

route.get('/test', SpotifyController.search)
>>>>>>> spotify

module.exports = route