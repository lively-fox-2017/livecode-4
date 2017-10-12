const express = require('express');
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
    model.Item.findAll({order:[['id', "ASC"]]})
        .then(items => {
            // res.send(row)
            res.render('item/item', { title: 'Item', data: items })
        })
        .catch(err => {
            res.send(err)
        })
})

// ========================================================ADD ITEM
router.get('/add', (req, res) => {
    let errmessage = ''
    // console.log(req.query);
    if (req.query.error){
        if (req.query.error === "Validation error: Validation is on codeitem failed")
            errmessage = "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
    }
    res.render('item/add', { title: 'Add Item' , sendError: errmessage})
})

router.post('/add', (req, res) => {
    model.Item.create({
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem
    })
        .then(() => {
            res.redirect('/item')
        })
        .catch(err => {
            res.redirect(`/item/add?error=${err.message}`)
            // res.send(err)
        })
})

// ===========================================================EDIT ITEM
router.get('/edit/:id', (req, res) => {
    let errmessage = ''
    // console.log(req.query);
    if (req.query.error) {
        if (req.query.error === "Validation error: Validation is on codeitem failed")
            errmessage = "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
    }
    model.Item.findById(req.params.id)
        .then(item => {
            res.render('item/edit', { title: 'Edit Item', data: item , sendError:errmessage})
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/edit/:id', (req, res) => {
    model.Item.update({
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/item')
        })
        .catch(err => {
            res.redirect(`/item/edit/${req.params.id}?error=${err.message}`)
        })
})

router.get('/delete/:id', (req, res) => {
    model.Item.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.redirect('/item')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router;