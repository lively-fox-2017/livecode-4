const express = require('express')
var bodyParser = require('body-parser')


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

//index
const index = require('./routes/index')
app.use('/', index)


//suppliers
const supplier = require('./routes/suppliers')
app.use('/suppliers', supplier)

//list
const item = require('./routes/items')
app.use('/items', item)


app.listen(3000)
