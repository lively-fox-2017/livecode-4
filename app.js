var express = require('express')
var bodyParser = require('body-parser')
//var session = require('express-session')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.set('view engine', 'ejs');
//app.use(session({secret: "Shh, its a secret!"}))

let suppliers = require('./routers/suppliers');
let items = require('./routers/items');
app.use('/suppliers', suppliers)
app.use('/items', items)

app.listen(process.env.PORT || '3000')
