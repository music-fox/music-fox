const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')
const SpotifyController = require('../controllers/musicController')
const {getSpotifyAccessToken} = require('../middlewares/spotify')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/user', UserController.list)
route.get('/user/:id', UserController.showById)

route.get('/', IndexController.home)

route.use(getSpotifyAccessToken)

route.post('/add', SpotifyController.add)

module.exports = route