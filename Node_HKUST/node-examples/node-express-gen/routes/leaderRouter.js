var express = require('express');
var leaderRouter = express.Router();

leaderRouter.route('/')
.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});
	next();

})

.get(function(req, res, next){

	res.end('Sends all the Leaders to you');

})

.post(function(req, res, next){

	res.end('Will create a new Leader with name: '+req.body.name+' and description: '+req.body.description+'.');

})

.delete(function(req, res, next){
	res.end('Will Delete all the Leaders');
});

leaderRouter.route('/:leaderId')
.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});
	next();

})

.get(function(req, res, next){

	res.end('Sends Leader to you with leaderId: '+req.params.leaderId);

})

.put(function(req, res, next){

	res.write('Updates the Leader with leaderId: '+req.params.leaderId+'.\n');
	res.end('Will update Leader with name: '+req.body.name+' and description: '+req.body.description+'.');

})

.delete(function(req, res, next){
	res.end('Will Delete Leader with leaderId: '+req.params.leaderId);
});


module.exports = leaderRouter;