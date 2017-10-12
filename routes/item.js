const express = require('express')
const router = express.Router()
const Model = require('../models')
const moment = require('moment')
// const CheckAuth = require('../helper/checkAuth')


router.get('/', (req, res) => {

	Model.Item.findAll().then(resultItem =>{
		res.render('pages/item.ejs', {resultItem})
	})
})

router.get('/addItem', (req, res) =>{
	res.render('pages/addItem.ejs')
})

router.post('/addItem', (req, res) =>{

	Model.Item.create({name : req.body.name, brand : req.body.brand, codeitem : req.body.codeitem}).then(() =>{
		res.redirect('/item')})
})

router.get('/editItem/:id', (req, res) =>{
	Model.Item.findOne({where : {id : req.params.id}}).then( resultItem =>{
		res.render('pages/editItem.ejs', {resultItem})
	})
})

router.post('/editItem/:id', (req, res) =>{
	Model.Item.update({name : req.body.name, brand : req.body.brand, codeitem : req.body.codeitem}, {where : {id : req.params.id}}).then(() =>{
		res.redirect('/item')})
})

router.get('/deleteItem/:id', (req, res) =>{
	Model.Item.destroy({where : {id : req.params.id}}).then(() =>{
		res.redirect('/item')
	})
})

module.exports = router