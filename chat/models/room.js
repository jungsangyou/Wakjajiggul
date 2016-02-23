var roomSchema = new Schema({
	title : String,
	regDt : {
	    type     : Date,
	    default  : Date.now
	},
	users : [{
	    type : Schema.Types.ObjectId,
	    ref  : 'User'
	}]
});

roomSchema.plugin(autoIncrement.plugin, {
    model: 'Room',
    field: 'roomId',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');