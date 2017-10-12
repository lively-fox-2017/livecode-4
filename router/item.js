var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req,res) => {
    models.Item.findAll()
    .then((data) => {
        // res.send(data)
        res.render('items', {data:data})
    })
    // res.send('halo')
})

router.get('/add', (req,res) => {
    res.render('addItem')
    // res.send('halo')
})

router.post('/add', (req,res) => {
    console.log(req.body.name)
    models.Item.create({
        name: `${req.body.name}`,
        brand: `${req.body.brand}`,
        codeitem: `${req.body.codeitem}`,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(() => {
        res.redirect('/item')
    })
    // res.send('halo')
})

router.get('/edit/:id', (req,res) => {
    res.render('editItem', {id: req.params.id})
    // res.send('halo')
})


router.post('/edit/:id', (req,res) => {
    console.log(req.body.name)
    models.Item.update({
        name: `${req.body.name}`,
        brand: `${req.body.brand}`,
        codeitem: `${req.body.codeitem}`,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.redirect('/item')
    })
    // res.send('halo')
})

router.get('/delete/:id', (req,res) => {
    models.Item.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.redirect('/item')
    })
    // res.send('halo')
})
module.exports = router
