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
	res.render('item/add', {errors:null})
})


router.post('/add', (req, res)=>{
		console.log(req.body)
	Models.Item.create({
		name:req.body.name,
		brand:req.body.brand,
		codeitem:req.body.codeitem
	}).then(()=>{
		res.redirect('/items')
	}).catch(err=>{

		res.render('item/add', {errors:err.errors})
	})
})

router.get('/edit/:id', (req, res)=>{
	Models.Item.findById(req.params.id).then(result=>{
		// res.send(result)
		res.render('item/edit', {data:result , errors:null})
	})
})

router.post('/edit/:id', (req, res)=>{
	Models.Item.update(req.body, {where:{id:req.params.id}}).then((result)=>{
		res.redirect('/items')
	}).catch(err=>{

		res.render(`item/edit`, {data: req.body,errors:err.errors})
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