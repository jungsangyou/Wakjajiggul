var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://" + GLOBAL.config.db.url);

autoIncrement.initialize(connection);

var roomSchema = new Schema({
	title : String,
	regDt : {
	    type     : Date,
	    default  : Date.now
	}
});

roomSchema.plugin(autoIncrement.plugin, {
    model: 'Room',
    field: 'roomId',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');