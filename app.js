const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const home = require('./routers/home');
const supplier = require('./routers/supplier');
const item = require('./routers/item');
const search =require('./routers/search');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use('/', home);
app.use('/suppliers', supplier);
app.use('/items', item);
app.use('/search', search);


app.listen(3000)
