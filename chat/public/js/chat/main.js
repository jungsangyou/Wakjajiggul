/**
 * chat.js
 */
var protocol = location.protocol + '//';
var host = location.host + '/';
var socket = io.connect(protocol + host);
socket.on('changeUsers', function (data){
	$("#socketUserList").html('');
	var num = 0;
	for(var i in data){
		if(data[i].loginId == "" || data[i].loginId == null ){
			continue;
		}
		num ++;
		if($("#socketUserList").find('li[loginId="'+data[i].loginId+'"]').eq(0).length > 0){
			var cnt = Number($("#chatName").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').eq(0).attr('count'));
			$("#socketUserList").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').html(' ('+ (cnt+1) + ')');
		}else{
			if(loginId == data[i].loginId){
				$("#socketUserList").append('<li _id="'+data[i].user._id+'" socketId="'+data[i].id+'" loginId="'+data[i].loginId+'"><a class="on">'+ data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
			}else{
				$("#socketUserList").append('<li _id="'+data[i].user._id+'" socketId="'+data[i].id+'" loginId="'+data[i].loginId+'"><a>'+ data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
			}
		}
	}
	
	$("#socketUserList > li").unbind('click').click(function(){
		if($("#addRoomDiv").css('display') == 'block'){
			if($(this).attr('check') == 'true'){
				$(this).attr('check', 'false');
				$(this).find('a').eq(0).find('em').eq(1).remove();
			}else{
				$(this).attr('check', 'true');
				$(this).find('a').eq(0).append('<em check> O</em>');
			}
		}
	});
	
});

socket.on('receive', function (data) {
	if(data.roomId  == gRoomId){
		var message = data.message.replace(/\n/gi,'<br>');
		if(data.loginId == loginId){
			$("#chatList").append('<li class="right"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
		}else{
			$("#chatList").append('<li class="left"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
		}
		$(".chatList").scrollTop($("#chatList").height() + 50);
	}
});

socket.on('receiveRoom', function (data) {
	getChatList();
});

$(document).ready(function(){
	console.log(socket);
})