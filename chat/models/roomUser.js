var roomUserSchema = new Schema({
	roomId : {
	    type     : Number,
	    required : true
	},
	loginId : {
	    type     : String,
	    required : true
	}
});

module.exports = mongoose.model('RoomUser', roomUserSchema, 'roomUsers');