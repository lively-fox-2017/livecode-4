const express = require('express');
const sequelize = require('sequelize');
const pg = require('pg');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const suppliers = require('./routes/suppliers');
const items = require('./routes/items');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/suppliers', suppliers)
app.use('/items', items)


app.listen(3000, function () {
  console.log('in port 3000');
})
