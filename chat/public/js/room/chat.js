/**
 * chat.js
 */
$(document).ready(function(){
	
	getChatList();
	
	$("#send").click(function(){
		var text = $(".chat > textarea").val();
		if(text == "" || text == null){
			return ;
		}
		$(".chat > textarea").val('');
		
		$.ajax({
		    url: '/api/chat/add/',
		    data : {roomId : gRoomId, text: text, _register : gUser._id},
		    type: 'POST',
		    success: function(data, status, xhr) {
		    	socket.emit('sendMessage', {roomId : gRoomId, message: text, loginId : gUser.loginId, nickname : gUser.nickname});
		    }
		});
		
		
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
	
	function getChatList(){
		$.ajax({
		    url: '/api/chat/list/',
		    data : {roomId : gRoomId},
		    type: 'GET',
		    success: function(data, status, xhr) {
		    	console.log('Chat List >> ', data);
		    	makeChatList(data);
		    }
		});
	}
	
	function makeChatList(data){
		for(var i in data){
			 var message = data[i].text.replace(/\n/gi,'<br>');
			 if(data[i]._register._id == gUser._id){
				$("#chatList").append('<li class="right"><em style="font-size:15px;">'+data[i]._register.nickname+" : </em><br>"+message+'</li>');
			}else{
				$("#chatList").append('<li class="left"><em style="font-size:15px;">'+data[i]._register.nickname+" : </em><br>"+message+'</li>');
			}
			$(".chatList").scrollTop($("#chatList").height() + 50);
		}
	}
})