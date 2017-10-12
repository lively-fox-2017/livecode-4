const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/', (req, res)=>{
	Models.Item.findAll().then(item=>{
		// res.send(supplier)
		res.render('item/list', {data:item})
	})
})

router.get('/add', (req, res)=>{
	res.render('item/add')
})


router.post('/add', (req, res)=>{
	Models.Item.create({
		name:req.body.name,
		kota:req.body.kota
	}).then(()=>{
		res.redirect('/items')
	})
})

router.get('/edit/:id', (req, res)=>{
	Models.Item.findById(req.params.id).then(result=>{
		// res.send(result)
		res.render('item/edit', {data:result})
	})
})

router.post('/edit/:id', (req, res)=>{
	Models.Item.update(req.body, {where:{id:req.params.id}}).then(()=>{
		res.redirect('/items')
	})
})

router.get('/delete/:id', (req, res)=>{
	Models.Item.findById(req.params.id).then(result=>{
		return result.destroy()
	}).then(()=>{
		res.redirect('/items')
	})
})
module.exports = router