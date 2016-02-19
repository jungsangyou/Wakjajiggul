/**
 * chat.js
 * chat fn 
 */
var socket = io.connect('http://localhost:3000/');
socket.on('changeUsers', function (data){
	$("#chatName").html('');
	var num = 0;
	for(var i in data){
		if(data[i].loginId == "" || data[i].loginId == null ){
			continue;
		}
		num ++;
		if($("#chatName").find('li[loginId="'+data[i].loginId+'"]').eq(0).length > 0){
			var cnt = Number($("#chatName").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').eq(0).attr('count'));
			$("#chatName").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').html(' ('+ (cnt+1) + ')');
		}else{
			if(loginId == data[i].loginId){
				$("#chatName").append('<li loginId="'+data[i].loginId+'"><a class="on">'+(num)+ '. ' + data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
			}else{
				$("#chatName").append('<li loginId="'+data[i].loginId+'"><a>'+(num)+ '. ' + data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
			}
			
		}
	}
});

socket.on('receive', function (data) {
	var message = data.message.replace(/\n/gi,'<br>');
	if(data.loginId == loginId){
		$("#chatList").append('<li class="right"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
	}else{
		$("#chatList").append('<li class="left"><em style="font-size:15px;">'+data.nickname+" : </em><br>"+message+'</li>');
	}
	$(".chatList").scrollTop($("#chatList").height() + 50);
});

$(document).ready(function(){
	$("#send").click(function(){
		var text = $(".chat > textarea").val();
		if(text == "" || text == null){
			return ;
		}
		$(".chat > textarea").val('');
		socket.emit('sendMessage', {message: text, loginId : loginId, nickname : nickname});
	});
	
	$(".chat > textarea").keydown(function(e){
		if(e.keyCode == 13){
			if(e.ctrlKey){
				return $(".chat > textarea").val($(".chat > textarea").val() + '\n');
			}else{
				e.preventDefault();
				$("#send").click();
			}
		}
	});
})

