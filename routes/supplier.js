const express = require('express')
const router = express.Router()
const Model = require('../models')
const moment = require('moment')

router.get('/', (req, res) => {

	Model.Suplier.findAll().then(resultSuplier =>{
		res.render('pages/index.ejs', {resultSuplier})
	})
})

router.get('/deleteSup/:id', (req, res) =>{

	Model.Suplier.destroy({where : {id : req.params.id}}).then(() =>{
		res.redirect('/suplier')})
})

router.get('/editSup/:id', (req, res) =>{
	Model.Suplier.findOne({where : {id : req.params.id}}).then( resultSup =>{
		res.render('pages/editSup.ejs', {resultSup})
	})
})

router.post('/updateSup/:id', (req, res) =>{
	
	Model.Suplier.update({name : req.body.name, kota : req.body.kota}, {where : {id : req.params.id}}).then(() =>{
		res.redirect('/suplier')})
})

router.get('/addSup', (req, res) =>{
	res.render('pages/addSup')
})

router.post('/addSup', (req, res) =>{
	Model.Suplier.create({
		name : req.body.name, 
		kota : req.body.kota,
		createdAt : new Date(),
      	updatedAt : new Date()
      }).then(res.redirect('/suplier'))
})

module.exports = router
