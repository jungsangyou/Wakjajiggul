var socket = io.connect('http://jslocalhost:3000/');
console.log(io);
socket.on('receive', function (data) {
	console.log(data);
	var message = data.message.replace(/\n/gi,'<br>');
	if(data.loginId == loginId){
		$("#chatList").append('<li class="right"><em style="font-size:15px;">'+data.loginId+" : </em><br>"+message+'</li>');
	}else{
		$("#chatList").append('<li class="left"><em style="font-size:15px;">'+data.loginId+" : </em><br>"+message+'</li>');
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
		socket.emit('sendMessage', {message: text, loginId : loginId});
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

