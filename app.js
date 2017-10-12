var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

let index = require('./routers/index');
let item = require('./routers/item');
let supplier = require('./routers/supplier')

app.use('/', index);
app.use('/item', item);
app.use('/supplier', supplier);

app.listen(3000, function () {
  console.log('Running on port 3000!')
})