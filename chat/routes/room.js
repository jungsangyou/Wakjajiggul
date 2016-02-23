exports.info = function(req, res, next) {
	var param = req.query;
	var roomId = param.roomId;

	req.models.Room.findOne({'roomId' : roomId}, function(error, room) {
	    if (error) return next(error);
	    if (room != null) {
	    	req.models.RoomUser.find({roomId : roomId}, function(error, roomUsers) {
    		    if (error) return next(error);
    		    if (roomUsers != null) {
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
	req.models.RoomUser.find({loginId: req.session.user.loginId}, function(error, roomUsers) {
	    if (error) return next(error);
	    if (roomUsers != null) {
	    	var roomIds = [];
			for (var i in roomUsers) {
				roomIds.push({roomId : roomUsers[i].roomId});
			}
			console.log('roomIds>>>>>' + JSON.stringify(roomIds));
			
			req.models.Room.find({ $or: roomIds }, function(error, room) {
			    if (error) return next(error);
			    if (room != null) {
			    	res.send(room);
			    }
			});
	    }
	});
};

exports.add = function(req, res, next) {
	var param = req.body;
	var title = param.title;
	var loginIds = param.loginIds;
	
	req.models.Room.create({title : title}, function(error, addResponse) {
	    if (error) return next(error);
	    
	    var room = addResponse;
	    for (var i in loginIds) {
	    	req.models.RoomUser.create({roomId : room.roomId, 
	    								loginId : loginIds[i]}, function(error, addResponse) {
			    if (error) return next(error);
			});
	    }
	    
	    res.send(room);
	});
};