var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req,res) => {
    res.render('index')
    // res.send('halo')
})

module.exports = router
