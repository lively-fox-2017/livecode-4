var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();

var index = require('./routes/index')
var suppliers = require('./routes/suppliers')
var items = require('./routes/items')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SET BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/suppliers', suppliers)
app.use('/items', items)

app.listen(3000, function(req,res) {
  console.log('ONLINE IN PORT 3000!');
})

module.exports = app;
