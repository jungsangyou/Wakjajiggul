module.exports = function(server){
	var socketUsers = new Array();
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
			if(globalCheck(socket.id)){
				socketMemberCheck(global.user.loginId);
			}
			io.sockets.emit('changeUsers', socketUsers);
		});
	});
	var globalCheck = function(id){
		if(typeof global.user != "undefined" && typeof global.user.loginId != "undefined" ){
			global.user.socketId = id; 
			return true;
		}else{
			return false;
		}
	}
	var socketMemberCheck = function(id){
		var nA = new Array();
		for(var i in socketUsers){
			if(socketUsers[i].loginId != id){
				nA.push(socketUsers[i]);
			}
		}
		socketUsers = nA;
	}
}
