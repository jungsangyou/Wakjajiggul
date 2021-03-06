module.exports = function(app, routes){
	var auth_admin = function(req, res, next) {
		console.log(req.session);
		global.user = req.session.user;
		if(req.session && req.session.user && req.session.admin) return next();
		else return res.redirect('/login');
	}
	var auth_user = function(req, res, next) {
		global.user = req.session.user;
		if(req.session && req.session.user) return next(); 
		else return res.redirect('/login');
	}
	// Pages and routes
	app.get('/', function(req, res) {
		res.redirect('login');
	});
	//redirect path
	app.get('/admin', auth_admin, routes.admin.admin); //admin
	app.get('/admin/add', auth_admin, routes.admin.add);
	app.get('/login', routes.login.login);
	app.get('/logout', routes.login.logout);
	app.get('/home/main', auth_user, routes.home.main); //main 
	app.get('/home/room', auth_user, routes.home.room); //main (room)
	app.get('/home/chat', auth_user, routes.home.chat); //main (chat)
	// REST API routes
	app.get('/api/authenticate/', routes.login.authenticate);
	app.post('/api/user/add/', auth_admin, routes.user.add);
	app.get('/api/room/', auth_user, routes.room.info);
	app.get('/api/room/list/', auth_user, routes.room.list);
	app.post('/api/room/add/', auth_user, routes.room.add);
	app.post('/api/room/remove/', auth_user, routes.room.remove);
	app.get('/api/chat/list/', auth_user, routes.chat.list);
	app.post('/api/chat/add/', auth_user, routes.chat.add);
	app.all('*', function(req, res) {
		res.send(404);
	});
}