const express = require('express')
const app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const item = require('./routes/item')
const supplier = require('./routes/supplier')
const index = require('./routes/index')



app.use('/items', item)
app.use('/suppliers', supplier)
app.use('/', index)


app.listen(process.env.PORT || '3000')

