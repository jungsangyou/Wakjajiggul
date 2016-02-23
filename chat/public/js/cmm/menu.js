var gRoomId = '';
$(document).ready(function(){
	
	getChatList();
	
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
		    	socket.emit('createRoom', {loginIds: loginIds});
		    	getChatList();
		    }
		});
	});
	
	function getChatList(){
		$.ajax({
		    url: '/api/room/list/',
		    type: 'GET',
		    success: function(data, status, xhr) {
		    	var innerHtml = '';
		    	console.log(data);
		    	$.each(data, function(index, room) {
		    		console.log(room);
		    		innerHtml += '<li class="menu01 on" id="' + room.roomId + '" roomOk="true" ><a><em><span>' + room.title + '</span></em></a>';
		    		innerHtml += '<div class="submenu"><ul id="chatName" calss="type2"><li><a>default</a></li></ul></div><em class="shadow"></em>';
//		    		if (data.loginIds.length > 0) {
//		    			innerHtml += '<div class="submenu"><ul id="chatName" calss="type2"><li><a>default</a></li></ul></div><em class="shadow"></em>';
//		    		}
		    		innerHtml += '</li>';
		    	});
		    	
		    	innerHtml += '<li class="menu01" roomOk="false">';
		    	innerHtml += '<a id="addRoom">';
		    	innerHtml += '<em><span roomId=""> ADD +';
		    	innerHtml += '</span></em></a></li>';
		    	
		    	$("#roomList > ul.menu").html(innerHtml);
		    	$(".submenu").hide();
		    	//add event 추가 
		    	$("#addRoom").unbind('click').click(function(){
		    		$("#roomList").hide();
		    		$("#addRoomDiv").show();
		    	});
//		    	
		    	$("li[roomOk=true]").unbind('click').click(function(){
		    		$(".submenu").hide();
		    		$(this).find('.submenu').show();
		    		
		    		var roomId = $(this).attr('id');
		    		gRoomId = roomId;
		    		$("#content").load('/home/chat/', roomId, function(){
		    			socket.emit('joinroom', {room: roomId});
		    		});
		    	});
		    }
		});
	}
});

