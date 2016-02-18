
/*
 * GET login page.
 */

exports.login = function(req, res, next) {
	res.render('login/login');
};

/*
 * GET logout route.
 */
exports.logout = function(req, res, next) {
	req.session.destroy();
	res.redirect('/login');
};

exports.authenticate = function(req, res, next) {
	if(!req.query.loginId) {
		console.info("check your email id")
		return;
	}
	var loginId = req.query.loginId;
	var password = req.query.password
	req.models.User.findOne({loginId: loginId, password : password}, function(error, result) {
	    if (error) return next(error);
	    if(result != null){
	    	req.session.user = result;
			req.session.admin = result.admin;
	    }
	    res.send(result);
	    
	});
	
}