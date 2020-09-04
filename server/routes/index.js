const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')
const SpotifyController = require('../controllers/musicController')
const {getSpotifyAccessToken} = require('../middlewares/spotify')
const { authentication, authorization } = require('../middlewares/auth')

route.get('/', IndexController.home)
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)


route.get('/user',authentication, UserController.list)
route.get('/user/:id',authentication, UserController.showById)

route.use(getSpotifyAccessToken)

route.post('/music/add', authorization, SpotifyController.add)
route.delete('/music/:id', authorization, SpotifyController.delete)

module.exports = route
