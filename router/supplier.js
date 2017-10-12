var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req,res) => {
    models.Suppliers.findAll()
    .then((data) => {
        res.send(data)
        // res.render('supplier', {data:data})
    })
    // res.send('halo')
})

router.get('/add', (req,res) => {
    res.render('addSupplier')
    // res.send('halo')
})

router.post('/add', (req,res) => {
    console.log(req.body.name)
    models.Suppliers.create({
        name: `${req.body.name}`,
        kota: `${req.body.kota}`,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(() => {
        res.redirect('/suppliers')
    })
    // res.send('halo')
})

router.get('/edit/:id', (req,res) => {
    res.render('editSupplier', {id: req.params.id})
    // res.send('halo')
})


router.post('/edit/:id', (req,res) => {
    console.log(req.body.name)
    models.Suppliers.update({
        name: `${req.body.name}`,
        kota: `${req.body.kota}`,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.redirect('/suppliers')
    })
    // res.send('halo')
})

router.get('/delete/:id', (req,res) => {
    models.Suppliers.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.redirect('/suppliers')
    })
    // res.send('halo')
})
module.exports = router
