const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let index = require('./routs/index')
let supplier = require('./routs/suppliers')
let item = require('./routs/items')
app.use('/', index)
app.use('/suppliers', supplier)
app.use('/items', item)


app.listen(3000);