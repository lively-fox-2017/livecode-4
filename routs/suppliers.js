const express = require('express')
const router = express.Router()
const model = require('../models')
router.get('/', (req,res) => {
	model.Supplier.findAll().then(suppliers => {
		res.render('supplier', {data:suppliers})
	})
})
router.get('/add', (req,res) => {
	res.render('supplier_add')
})
router.post('/add', (req,res) => {
	model.Supplier.create(req.body).then(add => {
		res.redirect('/suppliers')
	})
})
router.get('/edit/:id', (req,res) => {
	model.Supplier.findById(req.params.id).then(supplier => {
		res.render('supplier_edit', {data:supplier})
	})
})
router.post('/edit/:id', (req,res) => {
	model.Supplier.update(req.body,{where:{id:req.params.id}}).then(edit => {
		res.redirect('/suppliers')
	})
})
router.get('/delete/:id', (req,res) => {
	model.Supplier.destroy({where:{id:req.params.id}}).then(del => {
		res.redirect('/suppliers')
	})
})
module.exports = router