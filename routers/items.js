let express = require('express');
let router = express.Router();
let model = require('../models');

router.get('/', (req, res) => {
  model.Item.findAll().then((dataItem) => {
    res.render('item', {dataItem: dataItem})
  })
})

router.get('/add', (req, res) => {
  res.render('itemadd')
})

router.post('/add', (req, res) => {
  model.Item.create({name: req.body.name, brand: req.body.brand, codeitem: req.body.codeitem}).then(() => {
    res.redirect('/items')
  })
})

router.get('/delete/:id', (req, res) => {
  model.Item.destroy({where:{id: req.params.id}}).then(() => {
    res.redirect('/items')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Item.findAll({where:{id: req.params.id}}).then((dataItem) => {
    res.render('itemedit', {dataItem: dataItem})
  })
})

router.post('/edit/:id', (req, res) => [
  model.Item.update({name: req.body.name, brand: req.body.band, codeitem: req.body.codeitem}, {where: {id: req.params.id}}).then(() => {
    res.redirect('/items')
  })
])

module.exports = router
