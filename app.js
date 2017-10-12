const express = require('express');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const suppliers = require('./routes/suppliers');
const items = require('./routes/items');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
app.use('/', index);
app.use('/suppliers', suppliers);
app.use('/items', items);


app.listen(3000, () => {console.log('Running on port 3000')});