exports.user = require('./user');
exports.login = require('./login');
exports.home = require('./home');
exports.admin = require('./admin');
exports.room = require('./room');
exports.chat = require('./chat');
/*
 * GET home page.
 */
exports.index = function(req, res, next) {
	res.redirect('login');
};
