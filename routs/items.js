const express = require('express')
const router = express.Router()
const model = require('../models')
router.get('/', (req,res) => {
	model.Item.findAll().then(items => {
		res.render('item', {data:items})
	})
})
router.get('/add', (req,res) => {
	res.render('item_add')
})
router.post('/add', (req,res) => {
	model.Item.create(req.body).then(add => {
		res.redirect('/items')
	})
})
router.get('/edit/:id', (req,res) => {
	model.Item.findById(req.params.id).then(item => {
		res.render('item_edit', {data:item})
	})
})
router.post('/edit/:id', (req,res) => {
	model.Item.update(req.body,{where:{id:req.params.id}}).then(edit => {
		res.redirect('/items')
	})
})
router.get('/delete/:id', (req,res) => {
	model.Item.destroy({where:{id:req.params.id}}).then(del => {
		res.redirect('/items')
	})
})
module.exports = router