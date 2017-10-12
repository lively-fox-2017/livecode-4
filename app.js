const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const index=require('./routes/index')
const item=require('./routes/item')
const supplier=require('./routes/supplier')

app.use('/',index);
app.use('/items',item);
app.use('/suppliers',supplier);

app.listen(3000,()=>{
  console.log('listen on port 3000');
})
