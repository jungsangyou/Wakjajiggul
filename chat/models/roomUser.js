var roomUserSchema = new Schema({
	roomId : {
	    type : Number,
	    field: 'roomId',
	    ref  : 'Room'
	},
	loginId : {
		type : String,
	    ref  : 'User'
	}
});

module.exports = mongoose.model('RoomUser', roomUserSchema, 'roomUsers');