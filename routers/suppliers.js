let express = require('express');
let router = express.Router();
let model = require('../models');

// ------------------ CRUD ----------- //

// READ
router.get('/', function(req,res){
  model.Supplier.findAll().then(data_Suppliers =>{
    res.render('suppliers', {data_SuppliersToEjs:data_Suppliers})
  })
})

module.exports = router
