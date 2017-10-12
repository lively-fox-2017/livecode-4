const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//ejs
app.set('view engine', 'ejs');


//routers
const index = require('./routers/index')
const supplier = require('./routers/suppliers')


app.use('/', index)
app.use('/suppliers', suppliers)


app.listen(3030, function(){
  console.log('listen on port 3030')
})
