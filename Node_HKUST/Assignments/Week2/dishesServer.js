var mongoose = require('mongoose'),
assert = require('assert');

var Dishes = require('./models/dishes.js');

var url = "mongodb://localhost:27017/conFusion"
mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function(){

	console.log('Connection Successful');

	Dishes.create({
		name: 'Payesamm',
		image: 'images/payesam.png',
		category: 'dessert',
		price: '299',
		description: 'South Indian sweet dessert made with vermicilli',
		comments: [{
			rating: 4.5,
			comment: 'It\'s amazing, Best Indian Desert i had so far',
			author: 'Matt Bon'
		}]
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish Created');
		console.log(dish);

		var id = dish._id;

		Dishes.findByIdAndUpdate(id, {
			$set: {
				description: 'Indian dessert made with Vemicilli, nuts and milk'
			}
		}, 	{
			new: true
		}).exec(function(err, dish){
			if(err) throw err;

			console.log('Dish Updated Successfully.');
			console.log(dish);

			dish.comments.push({
				rating: 5.0,
				comment: 'Best Indian Desert',
				author: 'Matt Bon'
			});


			dish.save(function(err, dish){
				if(err) throw err;

				console.log('Comment Updated');
				console.log(dish);

				db.collection('dishes').drop(function(){
					db.close();
				});
			});

		});


	})

});