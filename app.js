const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const routerSupplier = require('./routes/suppliers');
const routerItems = require('./routes/items');
const routerIndex = require('./routes/index');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/suppliers', routerSupplier);
app.use('/items', routerItems);
app.use('/',routerIndex);

app.listen(3000)
