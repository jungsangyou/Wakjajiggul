$(document).ready(function(){

	$("#submitBt").unbind('click').click(function(){
		var count = 0;
		
		for(var i=0; i<$("[checkOption]").length; i++){
			if($("[checkOption]").eq(i).val() == '' || $("[checkOption]").eq(i).val() == null){
				alert("필수 항목을 모두 입력 해주세요 ");
				return false;
			}
		}
		var param = { 
					  loginId: $("#loginId").val(),
					  name: $("#userName").val(),
					  nickname: $("#nickname").val(),
					  age: $("#age").val(),
					  password: $("#password").val(),
					  admin: $("#adminChk").val() 
		}
		$.ajax({
		    url: '/api/addUser/',
		    type: 'POST',
		    data : param,
		    success: function(data, status, xhr) {
		    	if(data.loginId != '' && data.loginId != null){
		    		alert('add success!');
		    	}
		    }
		 });
		
	});

	
	
})