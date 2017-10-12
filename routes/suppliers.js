const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/', (req, res)=>{
	Models.Supplier.findAll({include:[Models.Item]}).then(supplier=>{
		// res.send(supplier)
		res.render('supplier/list', {data:supplier})
	})
})

router.get('/add', (req, res)=>{
	res.render('supplier/add')
})


router.post('/add', (req, res)=>{
	Models.Supplier.create({
		name:req.body.name,
		kota:req.body.kota
	}).then(()=>{
		res.redirect('/suppliers')
	})
})

router.get('/edit/:id', (req, res)=>{
	Models.Supplier.findById(req.params.id).then(result=>{
		// res.send(result)
		res.render('supplier/edit', {data:result})
	})
})

router.post('/edit/:id', (req, res)=>{
	Models.Supplier.update(req.body, {where:{id:req.params.id}}).then(()=>{
		res.redirect('/suppliers')
	})
})

router.get('/delete/:id', (req, res)=>{
	Models.Supplier.findById(req.params.id).then(result=>{
		return result.destroy()
	}).then(()=>{
		res.redirect('/suppliers')
	})
})

router.get('/:id/additem', (req, res)=>{
	Models.Supplier.findAll({where :{id:req.params.id},include:Models.Item}).then(result=>{
		
		res.render('supplier/addItem', {data:result})
	})
	// 
})


module.exports = router