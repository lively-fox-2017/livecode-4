const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routing

const index = require('./routes/index')
const suppliers = require('./routes/suppliers')
const items = require('./routes/item')

app.use('/', index)
app.use('/suppliers', suppliers)
app.use('/items', items)

app.listen(3000, () => {
  console.log('AYO JALAN!')
})
