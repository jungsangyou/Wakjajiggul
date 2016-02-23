var chatSchema = new Schema({
	roomId  : Number,
	loginId : String,
	text    : String,
	regDt : {
	    type     : Date,
	    default  : Date.now
	}
});

module.exports = mongoose.model('Chat', chatSchema, 'chat');