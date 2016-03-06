var gRoomId = '';
$(document).ready(function(){
	
	getRoomList();
	
	$("#finishRoom").unbind('click').click(function(){
		var title = $("#roomName").val();
		var loginIds = new Array();
		var users = new Array();
		var _ids = new Array();
		for(var i=0; i<$("#socketUserList > li[check=true]").length; i++){
			var loginId = $("#socketUserList > li[check=true]").eq(i).attr('loginId');
			var _id = $("#socketUserList > li[check=true]").eq(i).attr('_id');
			_ids.push(_id);
			loginIds.push(loginId);
		}
		if(title == '' || title == null || loginIds.length == 0){
			return;
		}
		var roomId = '1';
		$("#roomList").show();
		$("#addRoomDiv").hide();
		
		$.ajax({
		    url: '/api/room/add/',
		    data : {title : title, _ids : _ids},
		    type: 'POST',
		    success: function(data, status, xhr) {
		    	$("#roomName").val('');
		    	$("#socketUserList > li").attr('check', 'false');
		    	for(var i=0; i<$("#socketUserList > li").find('a').length; i++){
		    		$("#socketUserList > li").find('a').eq(i).find('em').eq(1).remove();
		    	}
		    	socket.emit('createRoom', {loginIds: loginIds});
		    }
		});
	});
});

function getRoomList(){
	$.ajax({
	    url: '/api/room/list/',
	    type: 'GET',
	    success: function(data, status, xhr) {
	    	var innerHtml = '';
	    	console.log('room list >> ', data);
	    	$.each(data, function(index, room) {
	    		var users = room.users;
	    		innerHtml += '<li class="menu01 on" id="' + room.roomId + '"><a id="joinRoom"><em><span>' + room.title + '</span ></em></a> <a id="deleteRoom" class="delete"><em><span>X</span></em></a>';
	    		for(var i in users){
	    			if(i==0){
	    				innerHtml += '<div class="submenu"><ul id="chatName" calss="type2"><li chatLoginId="'+users[i].loginId+'"><a>'+users[i].nickname+'</a></li>';
	    			}else{
	    				innerHtml += '<li chatLoginId="'+users[i].loginId+'"><a>'+users[i].nickname+'</a></li>';
	    			}
	    		}
	    		if(users.length > 0){
	    			innerHtml += '</ul></div><em class="shadow"></em>';
	    		}
	    		innerHtml += '</li>';
	    	});
	    	
	    	$("#roomUlList").html(innerHtml);
	    	$(".submenu").hide();
	    	
	    	//add event 추가 
	    	$("#addRoom").unbind('click').click(function(){
	    		$("#content").load('/home/room/', function(){
	    			$("#roomList").hide();
		    		$("#addRoomDiv").show();
	    		});
	    	});
//	    	
	    	$("li > #joinRoom").unbind('click').click(function(){
	    		$(".submenu").hide();
	    		$(this).parent().find('.submenu').show();
	    		
	    		var roomId = $(this).parent().attr('id');
	    		gRoomId = roomId;
	    		$("#content").load('/home/chat/', roomId, function(){
	    			socket.emit('joinroom', {room: roomId});
	    		});
	    	});
	    	
	    	$("li > #deleteRoom").unbind('click').click(function(){
	    		var roomId = $(this).parent().attr('id');
	    		$.ajax({
	    		    url: '/api/room/remove/',
	    		    data : {roomId : roomId},
	    		    type: 'POST',
	    		    success: function(data, status, xhr) {
	    		    	getRoomList();
	    		    }
	    		});
	    		
	    	});
	    	
	    	$("#content").load('/home/room/', function(){
	    		$("#roomList").show();
	    		$("#addRoomDiv").hide();
	    	});
	    }
	});
}
