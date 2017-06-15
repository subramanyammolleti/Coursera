var express = require('express');
var promoRouter = express.Router();

promoRouter.route('/')
.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});
	next();

})

.get(function(req, res, next){

	res.end('Sends all the promotions to you');

})

.post(function(req, res, next){

	res.end('Will create a new promotion with name: '+req.body.name+' and description: '+req.body.description+'.');

})

.delete(function(req, res, next){
	res.end('Will Delete all the Promotions');
});

promoRouter.route('/:promoId')
.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});
	next();

})

.get(function(req, res, next){

	res.end('Sends promotions to you with promoId: '+req.params.promoId);

})

.put(function(req, res, next){

	res.write('Updates the Promotions with promoId: '+req.params.promoId+'.\n');
	res.end('Will update promotion with name: '+req.body.name+' and description: '+req.body.description+'.');

})

.delete(function(req, res, next){
	res.end('Will Delete Promotion with promoId: '+req.params.promoId+'.');
});


module.exports = promoRouter;