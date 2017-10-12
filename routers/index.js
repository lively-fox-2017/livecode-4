let express = require('express');
let router = express.Router();
let model = require('../models');

// ------------------ CRUD ----------- //

// READ
router.get('/', function(req,res){
  res.render('index')
})


module.exports = router
