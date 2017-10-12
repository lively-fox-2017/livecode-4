const express = require('express');
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const supplier=require('./routes/supplier')

app.use('/supplier',supplier)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
