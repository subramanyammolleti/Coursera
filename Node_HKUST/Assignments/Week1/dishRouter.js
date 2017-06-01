var express = require('express'); 
var bodyParser = require('body-parser');

var dishRouter = express.Router(); // A mini node application
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});

	next(); // passes execution

})

.get(function(req, res, next){

	res.end('Will Send all the dishes to you.');

})

.post(function(req, res, next){

	res.end('Will add the dish: '+req.body.name+' with details: '+req.body.description+'.');

})

.delete(function(req, res, next){

	res.end('Deleting all the dishes.');

});

dishRouter.route('/:dishId')
.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});

	next(); // middleware execution continues

})
.get(function(req, res, next){

	res.end('Will Send details of the dish: '+req.params.dishId+' to you.');

})

.put(function(req, res, next){

	res.write('Updating the dish: '+req.params.dishId+'.\n');
	res.end('Will update the dish: '+req.body.name+' with details: '+req.body.description+'.');

})

.delete(function(req, res, next){

	res.end('Deleting dish: '+req.params.dishId);

});

module.exports = dishRouter;