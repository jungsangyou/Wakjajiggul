exports.info = function(req, res, next) {
	var param = req.query;
	var roomId = param.roomId;

	req.models.Room.findOne({roomId : roomId})
				   .populate('users')
				   .exec(function(error, rooms) {
						if (error) return next(error);
						if (rooms !== null) {
							console.log('rooms>>>>>' + rooms);
							res.send(rooms);
						}
				   });
};

exports.list = function(req, res, next) {
	req.models.Room.find({ users : {'$in' : [req.session.user._id]} }, function(error, rooms) {
		if (error) return next(error);
		if (rooms !== null) {
			res.send(rooms);
		}
	});
};

exports.add = function(req, res, next) {
	var param = req.body;
	var title = param.title;
	var _ids = param._ids;

	var room = new req.models.Room({ title: title, users: _ids });
	room.save(function(error, room) {
	    if (error) return next(error);
	    console.log(room);
	    res.send(room);
	});
};

exports.remove = function(req, res, next) {
	var param = req.body;
	var roomId = param.roomId;
	var _id = req.session.user._id;

	req.models.Room.findOne({ roomId: roomId }, function(error, room) {
	    if (error) return next(error);
	    
	    if (room !== null) {
	    	var tempUser = room.users;
	    	var index = tempUser.indexOf(_id);
	    	if (index >= 0) {
	    		tempUser.splice(index, 1);
	    		
		    	if (tempUser.length === 0) {
		    		req.models.Room.remove({ roomId: roomId }, function(error) {
		    		    if (error) return next(error);
		    		    res.send(true);
		    		});
		    	} else {
		    		room.users = tempUser;
		    		room.save(function(error, result) {
		    		    if (error) return next(error);
		    		    console.log('result>>>>>' + result);
		    		    res.send(true);
		    		});
		    	}
	    	}
	    }
	    res.send(true);
	});
};