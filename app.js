const express = require('express');
const app = express();
const ejs = require('ejs');
const session = require('express-session')
const bodyParser = require('body-parser')
const form = require("express-form")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(session({
	secret: 'berhasil',
	resave: false,
	saveUninitialized: true
}))
app.set('view engine','ejs')

const suplier = require('./routes/supplier')
const item = require('./routes/item')


app.use('/suplier', suplier)
app.use('/item', item)
// app.use('/', rekap)

app.listen('5000', function() {
  //console.log('sini guuys');
});
