var mongoose = require('mongoose'),
assert = require('assert');


var Leaders = require('./models/promotions.js');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function(){

	Leaders.create({
      name: "Weekend Grand Buffet",
      image: "images/buffet.png",
      label: "New",
      price: "19.99",
      description: "Featuring Grand Indian Style food"
	}, function(err, promotion){
		if(err) throw err;

		console.log('Promotion Created!');
		console.log(promotion);

		var id = promotion._id;

		Leaders.findByIdAndUpdate(id, {
			$set: {
				description: 'Featuring Grand South Indian Style food'
			}
			}, {
				new: true
			}).exec(function(err, promotion){
				console.log('Promotions has been updated');
				console.log(promotion);


				db.collection('promotions').drop(function(){
					db.close();
				});



			});



	});	

});