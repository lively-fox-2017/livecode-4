const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// const item = require('./routers/item')
// app.use('/',item)
// const index = require('./routers/index')
// app.use('/',index)
const suppliers = require('./routers/suppliers')
app.use('/suppliers',suppliers)




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
