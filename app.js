const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();

const index = require('./routes/index')
const supplier = require('./routes/supplier')
const item = require('./routes/item')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")

app.use('/', index)
app.use('/suppliers', supplier)
app.use('/item', item)

app.listen(2600, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Im running on port 2600");
  }
})
