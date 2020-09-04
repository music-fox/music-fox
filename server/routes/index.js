const route = require('express').Router()
const UserController = require('../controllers/UserController')
const IndexController = require('../controllers/indexController')
const SpotifyController = require('../controllers/musicController')
const {getSpotifyAccessToken} = require('../middlewares/spotify')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/user', UserController.list)
route.get('/user/:id', UserController.showById)
route.post('/googleLogin', UserController.googleLogin)

route.get('/', IndexController.home)

route.get('/track/:trackId', SpotifyController.track)
route.get('/lyric/:lyricId', SpotifyController.lyric)

route.use(getSpotifyAccessToken)

route.post('/music/add', SpotifyController.add)
route.delete('/music/:id', SpotifyController.delete)

module.exports = route
