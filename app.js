var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 

const suppliers = require('./router/supplier.js')
const index = require('./router/index.js')
const item = require('./router/item.js')

app.use('/', index)
app.use('/suppliers', suppliers)
app.use('/item', item)

app.listen(3000);
console.log('3000 is the magic port');