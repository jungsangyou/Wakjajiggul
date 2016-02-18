
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


