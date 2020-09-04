require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const {errHandler} = require('./middlewares/errhandler')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', route)

app.use(errHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))