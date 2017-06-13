var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: "String",
		required: true,
	},
	author: {
		type: "String",
		required: true,
	}
}, {
	timestamps: true
});


var dishSchema = new Schema({
	name: {
		type: "String",
		unique: "true",
		required: "true"
	},
	image: {
		type: "String",
		unique: "true",
		required: "true"	
	},
	category: {
		type: "String",
		required: "true"
	},
	label: {
		type: "String",
		default: ""
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: "String",
		required: "true"
	},
	comments: [commentSchema] // adding comment sub schema here
}, {
	timestamps: true
});

// adding it to the model
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
