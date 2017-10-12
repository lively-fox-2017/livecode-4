const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//ejs
app.set('view engine', 'ejs');


//routers
const index = require('./routers/index')
const suppliers = require('./routers/suppliers')
const items = require('./routers/items')


app.use('/', index)
app.use('/suppliers', suppliers)
app.use('/items', items)


app.listen(3030, function(){
  console.log('listen on port 3030')
})
