const express = require('express')
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let index = require('./routes/index.js')
let supplier = require('./routes/suppliers.js')
let item = require('./routes/items.js')

app.use('/',index)
app.use('/suppliers',supplier)
app.use('/items',item)

app.listen(3000, function() {
console.log('express app now listeng 3000');
});
