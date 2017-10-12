const express = require('express');
const router = express.Router();
const models = require('./../models')

// tampilkan semua data item
router.get('/', (req, res) => {
	models.Item.findAll()
	.then(items => {
		res.send(items);
	})
	.catch(err => {
		if (err) throw err;
	});
});

// tampilkan form input untuk menambahkan item
router.get('/add', (req, res) => {
	res.render('item-add');
});

// menambahkan item dengan data dari form input /add
router.post('/add', (req, res) => {
	const values = {
		name: 'Ipin X',
		brand: 'Ipin',
		codeitem: 'HP0234',
		createdAt: new Date(),
		updatedAt: new Date()
	}

	models.Item.create(values)
	.then(() => {
		res.redirect('/items');
	})
	.catch(err => {
		if (err.name === 'SequelizeValidationError') {
			res.render('item-add', {err});
		} else {
			throw err;
		}
	});
});

// menampilkan form data item berdasarkan id
router.get('/edit/:id', (req, res) => {
	const options = {where: {id: req.params.id}};

	models.Item.findOne(options)
	.then(item => {
		res.send(item);
	})
	.catch(err => {
		if (err) throw err;
	});
});

// mengupdate item berdasarkan id dari form /edit/:id
router.post('/edit/:id', (req, res) => {
	const options = {where: {id: req.params.id}};
	const values = {
		name: req.body.name,
		brand: req.body.brand,
		codeitem: req.body.codeitem,
		updatedAt: new Date()
	}

	models.Item.update(values, options)
	.then(() => {
		res.redirect('/items');
	})
	.catch(err => {
		if (err) throw err;
	});
});

// delete data item berdasarkan id
router.delete('/delete/:id', (req, res) => {
	const options = {where: {id: req.params.id}};

	models.Item.destroy(options)
	.then(() => {
		res.redirect('/items');
	})
	.catch(err => {
		if (err) throw err;
	});
});

module.exports = router;