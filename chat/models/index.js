GLOBAL.mongoose = require('mongoose');
GLOBAL.Schema = mongoose.Schema;
GLOBAL.autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://" + GLOBAL.config.db.url);

autoIncrement.initialize(connection);

exports.User = require('./user');
exports.Room = require('./room');
exports.RoomUser = require('./roomUser');
exports.Chat = require('./chat');