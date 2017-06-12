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

	Dishes.create({
		name: 'Uthapizza',
		description: 'Indian Uthappam with Western twist'
	}, function(err, dish){
		if(err) throw err;

		console.log("Dish Created");
		console.log(dish);

		var id = dish._id;

		setTimeout(function(){

			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: 'South Indian pancake with Western twist'
				}
			}, {
				new: true
			})
			.exec(function(err, dish){
				if(err) throw err;

				console.log('Dish updated');
				console.log(dish);
				db.collection('dishes').drop(function(){
					db.close();
				});
			})

		},3000);

	})

});	
