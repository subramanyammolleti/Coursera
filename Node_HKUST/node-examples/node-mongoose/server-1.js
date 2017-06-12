var mongoose = require('mongoose'),
assert = require('assert');

var Dishes = require('./models/dishes-1');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
	console.log('Connected to Server');

	var newDish = Dishes({
		name: 'Uthapizza',
		description: 'South Indian Uthappam with western twist'
	});

	newDish.save(function(err){
		if(err) throw err;

		console.log('Dish Created');

		//get all the users
		Dishes.find({}, function(err, dishes){
			if(err) throw err;

			console.log(dishes);

			db.collection('dishes').drop(function(){
				db.close();
			});

		});

	});

});

