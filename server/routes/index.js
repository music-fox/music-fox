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

route.use(authentication)

route.get('/user', UserController.list)
route.get('/user/:id', UserController.showById)

route.use(getSpotifyAccessToken)

route.post('/music/add', SpotifyController.add)


// masukin edit user dibawah sini
route.get('/music/:id/lyrics', authorization, SpotifyController.lyrics)
route.delete('/music/:id', authorization, SpotifyController.delete)

module.exports = route
