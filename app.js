const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// ejs
app.set('view engine', 'ejs');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let index = require('./router/index');
let suppliers = require('./router/suppliers')

//Index
app.use('/index',index)
// suppliers
app.use('/suppliers',suppliers)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
