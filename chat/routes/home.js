exports.main = function(req, res, next) {
	
	var userData = {
			loginId : req.session.user.loginId
			,name : req.session.user.name
			,nickname : req.session.user.nickname
	}
	console.log(userData);
	res.render('home/main', {user: userData});
};

exports.room = function(req, res, next) {
	res.render('home/room');
};

exports.chat = function(req, res, next) {
	var roomId = req.query.roomId;
	console.log('chat', roomId);
	res.render('home/chat', {roomId: roomId});
};