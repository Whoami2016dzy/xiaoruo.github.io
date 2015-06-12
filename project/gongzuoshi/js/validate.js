function validate() {
	$("form :input").blur(function(){
		var $parent = $(this).parent();
		$parent.prev(".formtips").remove();
		//验证学号
		if($(this).is('#id')){
			if(this.value.length != 10){
				var errorMsg = '学号是十位呦~';
				$parent.before('<span class="formtips onError">'+errorMsg + '</span>');
			}else{
				var okMsg = '正确啦~';
				$parent.before('<span class = "formtips onSuccess">'+okMsg + '</span>');
			}
		}
		//
		else if($(this).is('form :text')){
			if(this.value ==""){
				var errorMsg = "不能为空呦~";
				$parent.before('<span class="formtips onError">'+errorMsg + '</span>');
			}else{
				var okMsg = '正确啦~';
				$parent.before('<span class = "formtips onSuccess">'+okMsg + '</span>');
			}
		}
	})
	$("form :submit").click(function(){
		$("form :input").trigger('blur');
		var numError = $('form .onError').length;
		if(numError > 0){
			return false;
		}
	});
}