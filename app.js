
// const Sequelize = require('sequelize')
const express = require('express')
const app = express()

const  bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const suppliers = require('./routes/suppliers')

var ejs = require('ejs')
app.set('view engine','ejs')


app.use('/suppliers', suppliers);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
