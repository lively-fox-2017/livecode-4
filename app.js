// require express
const express = require('express')
const app = express()

// require body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json 

// require ejs
app.set('view engine', 'ejs')

// require router
const index = require('./routers/index')
app.use('/', index)

const supplier = require('./routers/supplier')
app.use('/suppliers', supplier)

const item = require('./routers/item')
app.use('/items', item)

app.listen('3000')
console.log('Listening on port 3000')
