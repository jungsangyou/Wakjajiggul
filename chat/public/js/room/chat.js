/**
 * chat.js
 */
$(document).ready(function(){
	$("#send").click(function(){
		var text = $(".chat > textarea").val();
		if(text == "" || text == null){
			return ;
		}
		$(".chat > textarea").val('');
		socket.emit('sendMessage', {roomId : gRoomId, message: text, loginId : loginId, nickname : nickname});
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