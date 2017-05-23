
//  mainBottom nav click
(function(){
	var Flag = true;
	$(function(){
		$('.mainbottom li > a ').on('click',function(ev){
			ev = ev || window.event;
			ev.preventDefault();
			if(Flag){
				$(this).css({backgroundImage:' url("img/mainbottom2.png")'})
				$(this).next().slideDown();
				Flag = false;
			}else{
				$(this).css({backgroundImage:' url("img/mainbottom.png")'})
			
				$(this).next().slideUp();
				Flag = true;
			}
			
		})
	});
})()
