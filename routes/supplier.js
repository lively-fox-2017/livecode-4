const express = require('express')
const router = express.Router()
const Model = require('../models')
const moment = require('moment')
// const CheckAuth = require('../helper/checkAuth')


router.get('/', (req, res) => {
	// router.use(CheckAuth)

	Model.Suplier.findAll().then(resultSuplier =>{
		//res.send(resultSuplier)
		res.render('pages/index.ejs', {resultSuplier})
	})
})

router.get('/deleteSup/:id', (req, res) =>{

	Model.Suplier.destroy({where : {id : req.params.id}}).then(res.redirect('/suplier'))
})

router.get('/editSup/:id', (req, res) =>{
	Model.Suplier.findOne({where : {id : req.params.id}}).then( resultSup =>{
		 //res.send(resultSup)
		res.render('pages/editSup.ejs', {resultSup})
	})
})

router.post('/updateSup/:id', (req, res) =>{
	
	Model.Suplier.update({name : req.body.name, kota : req.body.kota}, {where : {id : req.params.id}}).then(res.redirect('/suplier'))
})

router.get('/addSup', (req, res) =>{
	res.render('pages/addSup')
})

router.post('/addSup', (req, res) =>{
	Model.Suplier.create({
		name : req.body.name, 
		kota : req.bodykota,
		createdAt : new Date(),
      	updatedAt : new Date()
      }).then(res.redirect('/suplier'))
})





































// router.post('/selectSchedule/:idMk', (req, res) =>{

// let date = new Date(req.body.schedule);
// date = moment(date).add(7,'Hours')
  

//   Model.Dosen.findOne({include : [Model.Matakuliah]},{where : {id_mk : req.session.id_mk}}).then(result =>{
// 		Model.Schedule.findAll({where : {id_mk : result.id_mk}}).then(result_schedule =>{
// 			Model.MK_Mahasiswa.findAll({where : {id_mk : parseInt(req.params.idMk), courseDate : date}}).then(resultmahasiswa =>{
//     			//res.render('pages/absenmk', {result_dosen : result, result_schedule : result_schedule, id_dosen : req.session.id_dosen, moment : moment, mahasiswa : resultmahasiswa})
//   				//res.send(resultmahasiswa)
//   			})
// 			//res.send(result_schedule)
// 		})
// 	})

  
// })

module.exports = router
