const route = require('express').Router()
const {SpotifyController} = require('../controllers/musicController')

route.get('/test', SpotifyController.test)

module.exports = {
    route
}
