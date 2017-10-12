/*
GET /suppliers (menampilkan semua data supplier) 
GET /suppliers/add (menampilkan form untuk input)
POST /suppliers/add (menghandle input dari form)
GET /suppliers/edit/:id (menampilkan form data suppliers berdasarkan id)
POST /suppliers/edit/:id (meng-handle input dari form saat update)
GET /suppliers/delete/:id (men-delete data suppliers berdasarkan id)
*/

// require models
const Models = require('../models')

// require express
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	Models.Supplier.findAll({order: [['id', 'ASC']]}).then(dataSuppliers => {
		res.render('suppliers/index', {rows: dataSuppliers})
		// res.send(dataSuppliers)
	})
})

router.get('/add', function(req, res) {
	res.render('suppliers/add')
})

router.post('/add', function(req, res) {
	// console.log(req.body)
	Models.Supplier.create(req.body).then(() => {
		res.redirect('/suppliers')
	})
})

router.get('/edit/:id', function(req, res) {
	Models.Supplier.findById(req.params.id).then(dataSupplier => {
		res.render('suppliers/edit', {rows: dataSupplier})
		// res.send(dataSupplier)
	})
})

router.post('/edit/:id', function(req, res) {
	console.log(req.body, req.params.id)
	Models.Supplier.update(req.body, {where: req.params}).then(() => {
		res.redirect('/suppliers')
	})
})

router.get('/delete/:id', function(req, res) {
	Models.Supplier.destroy({where: req.params}).then(() => {
		res.redirect('/suppliers')
		// res.send('hai')
	})
})

module.exports = router