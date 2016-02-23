var chatSchema = new Schema({
	roomId    : {
	    type : Number,
	    ref  : 'Room'
	},
	_register : {
	    type : Schema.Types.ObjectId,
	    ref  : 'User'
	},
	text      : String,
	regDt     : {
	    type    : Date,
	    default : Date.now
	}
});

module.exports = mongoose.model('Chat', chatSchema, 'chat');