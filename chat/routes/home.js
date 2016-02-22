
/*
 * GET login page.
 */

exports.main = function(req, res, next) {
	
	var userData = {
			loginId : req.session.user.loginId
			,name : req.session.user.name
			,nickname : req.session.user.nickname
	}
	console.log(userData);
	res.render('home/main', {user: userData});
};


exports.list = function(req, res, next) {
	req.models.RoomUser.find({loginId: req.session.user.loginId}, function(error, result) {
	    if (error) return next(error);
	    if (result != null) {
	    	var roomIds = [];
			for (var roomId in result) {
				roomIds.push({roomId : roomId});
			}
			console.log('roomIds>>>>>' + JSON.stringify(roomIds));
			
			req.models.Room.find({ $or: roomIds }, function(error, result) {
			    if (error) return next(error);
			    if (result != null) {
			    	console.log('rooms>>>>>' + result);
			    	res.send(result);
			    }
			});
	    }
	});
};

exports.add = function(req, res, next) {
	var param = req.body;
	var title = param.title;
	var loginIds = param.loginIds;
	
	req.models.Room.create(title, function(error, addResponse) {
	    if (error) return next(error);
	    req.models.RoomUser.create(loginIds, function(error, addResponse) {
		    if (error) return next(error);
		    res.send(addResponse);
		});
	});
};
