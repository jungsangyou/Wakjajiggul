GLOBAL.config = require('./resource/config/config.json');

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  models = require('./models'),
  dbUrl = process.env.MONGOHQ_URL || 'mongodb://@' + GLOBAL.config.db.url,
  db = mongoose.connect(dbUrl, {safe: true}),
  everyauth = require('everyauth'),
  global = { user : {} },
  session = require('express-session'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

//everyAuth With google access 
everyauth.google
.appId("900717034966-rk27187rinune8jgdjq11gab9khor9gp.apps.googleusercontent.com")
.appSecret("ldlHWdm23ScE2-P8gN3WxbzU")
.scope('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')
.findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
	  try{
		  //세션 등록하기
		  var usersInfo = {
				  loginId : fbUserMetadata.email
				  ,name : fbUserMetadata.name
				  ,nickname : fbUserMetadata.name
				  ,admin : true
				  ,age : null
				  ,orgName : null
		  }
		  global.user = usersInfo;
		  session.user = usersInfo;
		  session.admin = true;
		  var promise = this.Promise();
	  	  promise.fulfill(fbUserMetadata);
	  	  return promise;
	 }catch(err){
		  console.log(err);
	 }
})
.redirectPath('/home/main');
everyauth.everymodule.handleLogout(routes.login.logout);
everyauth.everymodule.findUserById(function(user, callback){
	callback(user);
});

var app = express();
app.locals.appTitle = 'chat';

//mongoos > check model 
app.use(function(req, res, next) {
	if (! models.User) return next(new Error("No models."))
	req.models = models;
	return next();
});
app.set('port',  process.env.PORT || GLOBAL.config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({secret: '2C4477FA-D649-4D44-9535-46E296EF984F'}));
app.use(everyauth.middleware());
app.use(function(req, res, next){
	if(req.session && req.session.admin) res.locals.admin = true;
	next();
});

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

var chkSession = function(req, res, next) {
	if(req.session) return next();
	else return res.redirect('/login');
}

//development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

// Pages and routes
app.get('/', function(req, res) {
	res.redirect('login');
});

//redirect path
app.get('/admin', auth_admin, routes.admin.admin); //admin
app.get('/admin/add', auth_admin, routes.admin.add);
app.get('/login', routes.login.login);
app.get('/logout',  routes.login.logout);
app.get('/home/main', auth_user, routes.home.main); //main (chat)

// REST API routes
app.get('/api/authenticate/', routes.login.authenticate);
app.post('/api/addUser/', auth_admin, routes.user.add);

app.all('*', function(req, res) {
	res.send(404);
});

//socket setting & custom fn add
var socketUsers = new Array();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	if(globalCheck(socket.id)){
		var socketUser = {
				id : socket.id
			  , loginId : global.user.loginId
			  , user : global.user 
		}
		socketUsers.push(socketUser);
		io.sockets.emit('changeUsers', socketUsers);
	};
	socket.on('sendMessage', function(data){
		io.sockets.emit('receive', data);
	});
	socket.on('disconnect', function(data){
		var i = socketMemberCheck(socket.id);
		socketUsers.splice(i, 1);
		io.sockets.emit('changeUsers', socketUsers);
	});
});

var globalCheck = function(id){
	if(global.user && global.user.loginId) global.user.socketId = id; return true;
}

var socketMemberCheck = function(id){
	var n = -1;
	for(var i in socketUsers){
		if(socketUsers[i].id == id){
			n = i;
			break;
		}
	}
	return n;
}

// server setting
var boot = function () {
	server.listen(app.get('port'), function(){
		console.info('Express server listening on port ' + app.get('port'));
	});
}
var shutdown = function() {
	server.close();
}
if (require.main === module) {
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}

