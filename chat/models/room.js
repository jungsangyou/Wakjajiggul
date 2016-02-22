var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
	roomId : {
	    type     : String,
	    required : true
	},
	title : String,
	regDt : String
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');