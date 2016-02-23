module.exports = function(server){
	var socketUsers = new Array();
	var rooms = {};
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
		
		socket.on('joinroom', function(data){
	        socket.join(data.room);
	        socket.set(data.room, data.room,function() {
	            var room = data.room;
	         // Create Room
                if (rooms.room == undefined) {
                    console.log('room create :' + room);
                    rooms.room = new Object();
                    rooms.room.socket_ids = new Object();
                }
                // Store current user's nickname and socket.id to MAP
                rooms.room.socket_ids[global.user.loginId] = socket.id
                
                
	        });
	 
	    });
		socket.on('sendMessage', function(data){
			var room = data.roomId;
        	io.sockets.in(room).emit('receive', data);
		});
		socket.on('disconnect', function(data){
			//room delete 
			io.sockets.emit('changeUsers', socketUsers);
			socket.get('room',function(err,room) {
	            if(err) throw err;
	            if(room != undefined
	                && rooms.room != undefined){
	            	delete rooms.room.socket_ids[global.user.loginId];
	            }
	        });
			//total User List delete
			if(globalCheck(socket.id)){
				socketMemberCheck(global.user.loginId);
			}
			console.log(rooms);
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
