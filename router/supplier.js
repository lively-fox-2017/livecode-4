var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req,res) => {
    models.Suppliers.findAll({
        include: [{model: models.Item}]
    })
    .then((data) => {
        // res.send(data)
        // console.log(data[0].Items[0].SupplierItem.dataValues.price)
        // res.send(data[0].Items[0].SupplierItem)
        res.render('supplier', {data:data})
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


router.get('/assign/:id', (req,res) => {
    models.Suppliers.findById(req.params.id)
    .then(data => {
        models.Item.findAll()
        .then(items => {
            // res.send(items)
            // res.send(data)
            res.render('assignItem', {data: data, items: items})
        })
    })
})

router.post('/assign/:id', (req,res) => {
    if(req.body.price !== '') {
        models.SupplierItem.create({
            SupplierId: `${req.params.id}`,
            ItemId: `${req.body.itemId}`,
            price: `${req.body.price}`
        })
        .then(() => {
            res.redirect('/suppliers')
        })
    }
  
    // res.send('halo')
})
module.exports = router
