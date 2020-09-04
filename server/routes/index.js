const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')
const SpotifyController = require('../controllers/musicController')
const {getSpotifyAccessToken} = require('../middlewares/spotify')

route.post('/register', UserController.register)

route.get('/', IndexController.home)

route.use(getSpotifyAccessToken)

route.get('/test', SpotifyController.search)

module.exports = route