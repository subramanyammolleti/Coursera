var express = require('express'); 
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('short'));

app.use(bodyParser.json());

var dishRouter = express.Router(); // A mini node application
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all(function(req, res, next){

	res.writeHead(200, {'Content-type': 'text/html'});

	next(); // middleware execution continues

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

// adding route url to the router
app.use('/dishes',dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
	console.log(`Server has just started at http://${hostname}:${port}/`);
});