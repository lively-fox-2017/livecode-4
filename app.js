const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const index = require('./routes/index');
const suppliers = require('./routes/suppliers');
// const items = require('./routes/items');
// const search = require('./routes/search');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

app.use('/', index);
app.use('/suppliers', suppliers);
// app.use('/items', items);
// app.use('/search', search);

app.listen(3000);
