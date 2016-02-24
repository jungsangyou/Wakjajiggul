/**
 * main.js
 */
var protocol = location.protocol + '//';
var host = location.host + '/';
var socket = io.connect(protocol + host);
var gSocketUser = new Array();
socket.on('changeUsers', function (data){
	gSocketUser = data;
});
socket.on('receive', function (data) {
	if(data.roomId  == gRoomId){
		var message = data.message.replace(/\n/gi,'<br>');
		if(data.loginId == gUser.loginId){
			$("#chatList").append('<li class="right"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
		}else{
			$("#chatList").append('<li class="left"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
		}
		$(".chatList").scrollTop($("#chatList").height() + 50);
	}
});

socket.on('receiveRoom', function (data) {
	getRoomList();
});

$(document).ready(function(){
	console.log('socket Info >>', socket);
})