var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());
var mongoose = require('mongoose');

var Promotions = require('../models/promotions.js');

promoRouter.route('/')
.get(function(req, res, next){

	Promotions.find({}, function(err, promotions){
		if(err) throw err;

		res.json(promotions);
	});
	
})

.post(function(req, res, next){

	Promotions.create(req.body, function(err, promotion){
		if(err) throw err;

		console.log('Promotion Created');

		var id = promotion._id;
		res.writeHead(200, {
			'Content-type': 'text/plain'
		});

		res.end('Added the promotion with id: '+id);
	
	});

})

.delete(function(req, res, next){
	Promotions.remove({}, function(err, promotion){
		if(err) throw err;

		res.json(promotion);
	});
});

promoRouter.route('/:promoId')

.get(function(req, res, next){

	Promotions.findById(req.params.promoId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });

})

.put(function(req, res, next){

	Promotions.findByIdAndUpdate(req.params.promoId, {
		$set: req.body
	}, {
		new: true	
	}, function(err, promotion){
		if(err) throw err;

		res.json(promotion);
	});

})

.delete(function(req, res, next){
	 Promotions.findByIdAndRemove({}, function(err, promotion){
	 	if(err) throw err;

	 	res.json(promotion);
	 });
});


module.exports = promoRouter;