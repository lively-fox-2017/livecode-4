var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
const index = require('./routes/index')
app.use('/', index)

const supplier = require('./routes/supplier')
app.use('/suppliers', supplier)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
