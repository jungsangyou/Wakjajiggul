var gRoomId = '';
$(document).ready(function(){
	
	getChatList();
	
//	$("#addRoom").click(function(){
//		var title = 'chat test';
//		var loginIds = ['jungsangyou@gmail.com', 'ej8486.choi@gmail.com'];
//		
//		if(lgnId == null || password == null || lgnId == '' || password == ''){
//			alert("ID 또는 PASSWORD를 입력해 주세요 ");
//			return;
//		}
//		$.ajax({
//		    url: '/api/chat/add/',
//		    type: 'POST',
//		    data : {title : title, loginIds : loginIds},
//		    success: function(data, status, xhr) {
//		    	console.log(data);
//		    }
//		 });
//		
//	});
	
	$("#finishRoom").unbind('click').click(function(){
		var title = $("#roomName").val();
		var loginIds = new Array();
		var socketIds = new Array();
		for(var i=0; i<$("#socketUserList > li[check=true]").length; i++){
			loginIds.push($("#socketUserList > li[check=true]").eq(i).attr('loginId'));
			socketIds.push($("#socketUserList > li[check=true]").eq(i).attr('socketId'));
		}
		var roomId = '1';
//		socket.emit('joinroom', {room: roomId, loginIds : loginIds, socketIds :socketIds});
		$("#roomList").show();
		$("#addRoomDiv").hide();
		
		$.ajax({
		    url: '/api/chat/add/',
		    data : {title : title, loginIds : loginIds},
		    type: 'POST',
		    success: function(data, status, xhr) {
		    	getChatList();
		    	var joinRoomId = data.roomId;
		    }
		});
	});
	
	function getChatList(){
		$.ajax({
		    url: '/api/chat/list/',
		    type: 'GET',
		    success: function(data, status, xhr) {
		    	var innerHtml = '';

		    	$.each(data, function(index, room) {
		    		console.log(room.title);
		    		innerHtml += '<li class="menu01 on" id="' + room.roomId + '" roomOk="true" ><a><em><span>' + room.title + '</span></em></a>';
		    		if (index == 0) {
		    			innerHtml += '<div class="submenu"><ul id="chatName" calss="type2"><li><a>default</a></li></ul></div><em class="shadow"></em>';
		    		}
		    		innerHtml += '</li>';
		    	});
		    	
		    	innerHtml += '<li class="menu01" roomOk="false">';
		    	innerHtml += '<a id="addRoom">';
		    	innerHtml += '<em><span roomId=""> ADD +';
		    	innerHtml += '</span></em></a></li>';
		    	
		    	$("#roomList > ul.menu").html(innerHtml);
		    	
		    	//add event 추가 
		    	$("#addRoom").unbind('click').click(function(){
		    		$("#roomList").hide();
		    		$("#addRoomDiv").show();
		    	});
//		    	
		    	$("li[roomOk=true]").unbind('click').click(function(){
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

