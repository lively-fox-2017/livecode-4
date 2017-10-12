const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const suppliers = require('./routes/suppliersRoute.js');
const items = require('./routes/itemsRoute.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/suppliers', suppliers);
app.use('/items', items);

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000');
});
