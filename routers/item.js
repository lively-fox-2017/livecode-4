/*
GET /items (menampilkan semua data item) 
GET /items/add (menampilkan form untuk input)
POST /items/add (menghandle input dari form)
GET /items/edit/:id (menampilkan form data items berdasarkan id)
POST /items/edit/:id (meng-handle input dari form saat update)
GET /items/delete/:id (men-delete data items berdasarkan id)
*/

// require models
const Models = require('../models')

// require express
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	Models.Item.findAll({order: [['id', 'ASC']]}).then(dataItems => {
		res.render('items/index', {rows: dataItems})
		// res.send(dataItems)
	})
})

router.get('/add', function(req, res) {
	res.render('items/add')
})

router.post('/add', function(req, res) {
	// console.log(req.body)
	Models.Item.create(req.body).then(() => {
		res.redirect('/items')
	}).catch(err => {
		console.log(err)
		// res.render('items/add', {err: err})
		res.send(err)
	})
})

router.get('/edit/:id', function(req, res) {
	Models.Item.findById(req.params.id).then(dataItem => {
		res.render('items/edit', {rows: dataItem})
		// res.send(dataItem)
	})
})

router.post('/edit/:id', function(req, res) {
	console.log(req.body, req.params.id)
	Models.Item.update(req.body, {where: req.params}).then(() => {
		res.redirect('/items')
	})
})

router.get('/delete/:id', function(req, res) {
	Models.Item.destroy({where: req.params}).then(() => {
		res.redirect('/items')
		// res.send('hai')
	})
})

module.exports = router