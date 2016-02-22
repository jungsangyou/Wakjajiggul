var mongoose = require('mongoose');

var roomUserSchema = new mongoose.Schema({
	roomId : {
	    type     : String,
	    required : true
	},
	loginId : {
	    type     : String,
	    required : true
	}
});

module.exports = mongoose.model('RoomUser', roomUserSchema, 'roomUsers');