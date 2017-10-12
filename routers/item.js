const express = require('express')
const router = express.Router()
const model = require('../models')




router.get('/',function(req, res){

  res.render('item', {})
})



module.exports = router
