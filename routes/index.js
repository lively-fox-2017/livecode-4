const express = require('express');
const router = express.Router();
const Model = require('../models')


router.use('/', function(req, res){
    res.render('index')
})


  module.exports = router;