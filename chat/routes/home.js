exports.main = function(req, res, next) {
	
	var userData = {
			loginId : req.session.user.loginId
			,name : req.session.user.name
			,nickname : req.session.user.nickname
	}
	console.log(userData);
	res.render('home/room', {user: userData});
};

exports.chat = function(req, res, next) {
	var roomId = req.query.roomId;
	console.log('chat', roomId);
	res.render('home/chat', {roomId: roomId});
};