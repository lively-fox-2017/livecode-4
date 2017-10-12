const express = require('express');
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const supplier=require('./routes/supplier')
const item  =require('./routes/item')
const index=require('./routes/index')

app.use('/',index)
app.use('/supplier',supplier)
app.use('/item',item)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
