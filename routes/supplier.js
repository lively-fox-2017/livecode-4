const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function(req, res){
    Model.Supplier.findAll().then(result =>{
        res.render('supplier', {dataSupplier : result})
    })
})

router.get('/add', function(req, res){
    res.render('supplier-add')
})


module.exports = router;