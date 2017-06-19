var express = require('express'); 
var bodyParser = require('body-parser')

var leaderRouter = express.Router(); // A mini application


leaderRouter.use(bodyParser.json());
var mongoose = require('mongoose');

var Leaders = require('../models/leadership.js');


leaderRouter.route('/')
.get(function(req, res, next){

	Leaders.find({}, function(err, leader){
		if(err) throw err;

		res.json(leader);
	});

})

.post(function(req, res, next){

	Leaders.create(req.body, function(err, leader){
		if(err) throw err;

		console.log('Leader Created!');

		var id = leader._id;
		res.writeHead(200, {
			'Content-type': 'text/plain'
		});

		res.end('Leader created with id: '+id);


	});

})

.delete(function(req, res, next){
	Leaders.remove({}, function(err, resp){
		if(err) throw err;

		res.json(resp);
	});

});

leaderRouter.route('/:leaderId')

.get(function(req, res, next){

	Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });

})

.put(function(req, res, next){

	Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });

})

.delete(function(req, res, next){
	 Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {        
	 	if (err) throw err;
        res.json(resp);
    });
});


module.exports = leaderRouter;