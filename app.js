const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const pg = require('pg');
const sequelize = require('sequelize');

const index = require('./routes/index')
const supplier = require('./routes/supplier')
const item = require('./routes/item')

app.set('view engine', 'ejs');

// APP USE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', index)
app.use('/supplier', supplier)
app.use('/item', item)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})