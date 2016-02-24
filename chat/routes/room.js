exports.info = function(req, res, next) {
	var param = req.query;
	var roomId = param.roomId;

	req.models.Room.findOne({'roomId' : roomId}, function(error, room) {
	    if (error) return next(error);
	    if (room !== null) {
	    	req.models.RoomUser.find({roomId : roomId}, function(error, roomUsers) {
    		    if (error) return next(error);
    		    if (roomUsers !== null) {
    		    	var result = new Object();
    		    	result.room = room;
    		    	result.roomUsers = roomUsers;
    		    	res.send(result);
    		    }
    		});
	    }
	});
};

exports.list = function(req, res, next) {
	req.models.Room.find()
				   .populate({
					   path: 'users',
					   match: { loginId : req.session.user.loginId }
				   })
				   .exec(function(error, rooms) {
						if (error) return next(error);
						if (rooms !== null) {
							console.log('rooms>>>>>' + rooms);
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

	req.models.Room.remove({ roomId: roomId }, function(error) {
	    if (error) return next(error);
	    res.send(true);
	});
};