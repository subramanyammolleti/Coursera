var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// connection URL
var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);

	console.log('Connection Successful');

	var collection = db.collection('dishes');

	collection.insertOne({name: 'Uthapizza', description: 'test2'}, function(err, result){
		assert.equal(err, null);

		console.log('After Insertion: ');
		console.log(result.ops);

		collection.find({}).toArray(function(err, docs){

			assert.equal(err, null);
			console.log('Found: ');
			console.log(docs);

			db.dropCollection('dishes', function(err, result){
			assert.equal(err, null);
			db.close();

		});

		});


	})

});

