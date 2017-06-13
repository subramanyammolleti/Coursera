var mongoose = require('mongoose'),
assert = require('assert');


var Leaders = require('./models/leadership.js');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function(){

	Leaders.create({
	  name: "Peter Pan",
      image: "images/alberto.png",
      designation: "Chief Epicurious Officer",
      abbr: "CEO",
      description: "Our CEO, Peter is a leader who has been leading the company very well."
	}, function(err, leader){
		if(err) throw err;

		console.log('Leader Created!');
		console.log(leader);

		var id = leader._id;

		Leaders.findByIdAndUpdate(id, {
			$set: {
				designation: 'Cheif Executive Officer'
			}
			}, {
				new: true
			}).exec(function(err, leader){
				console.log('Leader has been updated');
				console.log(leader);


				db.collection('leaders').drop(function(){
					db.close();
				});



			});



	});	

});