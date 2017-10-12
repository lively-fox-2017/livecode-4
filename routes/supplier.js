const express = require('express');
const router = express.Router()
const model = require('../models')

router.get('/', (req, res)=>{
    model.Supplier.findAll()
    .then(suppliers=>{
        // res.send(row)
        res.render('supplier/supplier', {title: 'Supplier', data: suppliers})
    })
    .catch(err=>{
        res.send(err)
    })
})

// ========================================================ADD SUPPLIER
router.get('/add', (req, res)=>{
    res.render('supplier/add', {title: 'Add Supplier'})
})

router.post('/add', (req, res)=>{
    model.Supplier.create({
        name: req.body.name,
        kota: req.body.kota
    })
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        res.send(err)
    })
})

// ===========================================================EDIT SUPPLIER
router.get('/edit/:id', (req, res)=>{
    model.Supplier.findById(req.params.id)
    .then(supplier=>{
        res.render('supplier/edit', {title: 'Edit Supplier', data:supplier})
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/edit/:id', (req, res)=>{
    model.Supplier.update({
        name: req.body.name,
        kota: req.body.kota,
        alamat: req.body.alamat
    },{
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/delete/:id', (req, res)=>{
    model.Supplier.destroy({where:{
        id: req.params.id
    }})
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;