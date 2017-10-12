const express = require('express')
const router = express.Router()
const Models = require('../models')
const helpers = require('../helpers/items/codeItem')

router.get('/', (req, res) => {
  Models.Item.findAll({
    include: [{
      model: Models.Supplier
    }]
  })
  .then(items => {
    res.render('item', {
      data: items,
      title: 'Items Page'
    })
  })
})

router.get('/add', (req, res) => {
  res.render('addItem', {
    regErr: null,
    dataErr: null,
    title: 'Add Item Page'
  })
})

router.post('/add', (req, res) => {
  let code = helpers(req.body.codeitem)
  if(!code){
    Models.Item.create({
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem
    })
    .then(item => {
      res.redirect('/items')
    })
    .catch(err => {
      res.render('addItem', {
        dataErr: err.errors[0],
        regErr: null,
        title: 'Add Item Page'
      })
    })
  }else{
    res.render('addItem', {
      dataErr: null,
      regErr: code,
      title: 'Add Item Page'
    })
  }
})

router.get('/edit/:id', (req, res) => {
  Models.Item.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(item => {
    res.render('editItem', {
      data: item[0],
      dataErr: null,
      regErr: null,
      title: 'Edit Item Page'
    })
  })
})

router.post('/edit/:id', (req, res) => {
  let code = helpers(req.body.codeitem)
  if(!code){
    Models.Item.update({
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/items')
    })
    .catch(err => {
      Models.Item.findAll({
        where: {
          id: req.params.id
        }
      })
      .then(item => {
        res.render('editItem', {
          data: item[0],
          dataErr: err.errors[0],
          regErr: code,
          title: 'Edit Item Page'
        })
      })
    })
  }else{
    Models.Item.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(item => {
      res.render('editItem', {
        data: item[0],
        dataErr: null,
        regErr: code,
        title: 'Edit Item Page'
      })
    })
    .catch(err => {
      Models.Item.findAll({
        where: {
          id: req.params.id
        }
      })
      .then(item => {
        res.render('editItem', {
          data: item[0],
          dataErr: err,
          regErr: code,
          title: 'Edit Item Page'
        })
      })
    })
  }
})

router.get('/delete/:id', (req, res) => {
  Models.Item.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/items')
  })
})

module.exports = router
