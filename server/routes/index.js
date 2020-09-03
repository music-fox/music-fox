const route = require('express').Router()


route.get('/', indexController.home)

module.exports = route