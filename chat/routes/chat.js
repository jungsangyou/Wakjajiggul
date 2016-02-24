exports.list = function(req, res, next) {
	var param = req.query;
	var roomId = param.roomId;
	
	req.models.Chat.find({ roomId: roomId })
				   .populate('_register')
				   .exec(function(error, result) {
						if (error) return next(error);
						if (result !== null) {
							console.log('chat>>>>>' + result);
							res.send(result);
						}
				   });
};

exports.add = function(req, res, next) {
	var param = req.body;
	var roomId = param.roomId;
	var _register = param._register;
	var text = param.text;

	var chat = new req.models.Chat({ roomId: roomId, _register: _register, text: text });
	chat.save(function(error, chat) {
	    if (error) return next(error);
	    console.log(chat);
	    res.send(chat);
	});
};