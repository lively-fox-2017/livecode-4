const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    Model.Item.findAll().then(result => {
        res.render('items', { dataItem: result })
    })
})

router.get('/add', function (req, res) {
    res.render('items-add', { message: '' })
})

router.post('/add', function (req, res) {
    Model.Item.create(req.body).then(result => {
        res.redirect('../items')
    }).catch(function (msg) {
        res.render('items-add', { message: msg })
    })
})

router.get('/edit/:id', function (req, res) {
    Model.Item.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.render('items-edit', { dataItem: result, message :'' })
    })
})
router.post('/edit/:id', function (req, res) {
    Model.Item.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.redirect('../../items')
    }).catch(function(msg){
       res.render('items-edit', { message: msg })
    })
})

router.get('/delete/:id', function (req, res) {
    Model.Item.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.redirect('../../items')
    })
})
module.exports = router;