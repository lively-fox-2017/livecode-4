const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    Model.Supplier.findAll({ include: [Model.Item, Model.SupplierItem] }).then(result => {
        
        res.render('supplier', { dataSupplier: result })
    })
})

router.get('/add', function (req, res) {
    res.render('supplier-add')
})

router.post('/add', function (req, res) {
    Model.Supplier.create(req.body).then(result => {
        res.redirect('../suppliers')
    })
})

router.get('/edit/:id', function (req, res) {
    Model.Supplier.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.render('supplier-edit', { dataSupplier: result })
    })
})
router.post('/edit/:id', function (req, res) {
    Model.Supplier.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.redirect('../../suppliers')
    })
})

router.get('/delete/:id', function (req, res) {
    Model.Supplier.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.redirect('../../suppliers')
    })
})

router.get('/:id/additem', function(req, res){
    Model.Supplier.findOne({
        where : {
            id : req.params.id
        }
    }).then(result=>{
        res.render('supplieritem', {data : result})
    })

})
module.exports = router;