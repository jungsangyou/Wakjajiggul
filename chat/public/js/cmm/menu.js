$(document).ready(function(){
	$.ajax({
	    url: '/api/chat/list/',
	    type: 'GET',
	    success: function(data, status, xhr) {
	    	var innerHtml = '';

	    	$.each(data, function(index, room) {
	    		console.log(room.title);
	    		innerHtml += '<li class="menu01 on" id="' + room.roomId + '"><a><em><span>' + room.title + '</span></em></a>';
	    		if (index == 0) {
	    			innerHtml += '<div class="submenu"><ul id="chatName" calss="type2"><li><a>호잇</a></li></ul></div><em class="shadow"></em>';
	    		}
	    		innerHtml += '</li>';
	    	});
	    	
	    	$(".menu").html(innerHtml);
	    }
	});
	
	$("#addRoom").click(function(){
		var title = 'chat test';
		var loginIds = ['jungsangyou@gmail.com', 'ej8486.choi@gmail.com'];
		
		if(lgnId == null || password == null || lgnId == '' || password == ''){
			alert("ID 또는 PASSWORD를 입력해 주세요 ");
			return;
		}
		
		$.ajax({
		    url: '/api/chat/add/',
		    type: 'POST',
		    data : {title : title, loginIds : loginIds},
		    success: function(data, status, xhr) {
		    	console.log(data);
		    }
		 });
		
	});
});