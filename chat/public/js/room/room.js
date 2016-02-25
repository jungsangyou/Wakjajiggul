$(document).ready(function(){
	fn_make_socketUser_list();
	function fn_make_socketUser_list(){
		$("#socketUserList").html('');
		var num = 0;
		var data = gSocketUser;
		for(var i in data){
			if(data[i].loginId == "" || data[i].loginId == null ){
				continue;
			}
			num ++;
			if($("#socketUserList").find('li[loginId="'+data[i].loginId+'"]').eq(0).length > 0){
				var cnt = Number($("#chatName").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').eq(0).attr('count'));
				$("#socketUserList").find('li[loginId="'+data[i].loginId+'"]').eq(0).find('a > em').html(' ('+ (cnt+1) + ')');
			}else{
				if(gUser.loginId == data[i].loginId){
					$("#socketUserList").append('<li _id="'+data[i].user._id+'" socketId="'+data[i].id+'" loginId="'+data[i].loginId+'"><a class="on">'+ data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
				}else{
					$("#socketUserList").append('<li _id="'+data[i].user._id+'" socketId="'+data[i].id+'" loginId="'+data[i].loginId+'"><a>'+ data[i].user.nickname + '<em count=1 > (1) </em></a></li>');
				}
			}
			//채팅방 접속 사용자 표기
			$("li[chatloginid]").removeClass('on');
			$("li[chatloginid='"+data[i].loginId+"']").addClass('on');
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
	}
})

