
//  silde nav click
	sildeNav($('.mainbottom li > a '));
	sildeNav($('.mubuinner li > a '));
	function sildeNav(elm){
		elm.on('click',function(){
			// 开始判断
				// 若 点击未展开的 a
			if($(this).attr('data-flag') == "true"){
				// 全部归置
				$(this).parents('ul').find('.list2nd').slideUp();
				$(this).parents('ul').find('.list2nd').prev().css({backgroundImage:' url("img/mainbottom.png")'});
				$(this).parents('ul').find('li > a').attr('data-flag','true');
				// 选中 a 改变
				$(this).css({backgroundImage:' url("img/mainbottom2.png")'});
				$(this).next().slideDown();
				$(this).attr('data-flag','false')
			}
				// 若 点击已展开的 a
			else{
				$(this).css({backgroundImage:' url("img/mainbottom.png")'});
				$(this).next().slideUp();
				$(this).attr('data-flag','true')
			}
		})
	}
// header mubu offOn
	var flag2 = true;
	$('.topMenus span').on('click',function(){
		var $this = $(this);
		if(flag2){
			$('.mubu').slideDown();
			$this.removeClass('fa-bars').addClass('fa-times');
			$('.mubu').promise().done(function(){
				$('.main').css({display:'none'});
				$('.logo').addClass('mubulogo');
				$this.css({color:'#fff'});
				$('.mubuinner li a ').css({color:"rgba(255,255,255,.7)" ,  "transform": "translate(0) scale(1)"});
				$('.mubuinner > div > a').css({opacity:'1'});
			})
			flag2 = !flag2;
		}else{
			$('.mubu').slideUp();
			$('.mubuinner .list2nd').slideUp();
			$('.mubuinner li > a ')
				.attr('data-flag','true')
				.css({backgroundImage:' url("img/mainbottom.png")'});
			$this.removeClass('fa-times').addClass('fa-bars');
			$('.main').css({display:'block'});
			$('.mubuinner li a').css({color:"#2f2f2f" , transform:"translate(75px,-15px) scale(1.2)"});
			$('.mubu').promise().done(function(){	
				$('.logo').removeClass('mubulogo');
				$this.css({color:'inherit'});
					$('.mubuinner > div > a').css({opacity:0});
			});
			flag2 = !flag2;
		}
	});

	// click <a> main 内容替换

	$('a[data-keys]').on('click',function(){
		var Keys = $(this).attr('data-keys');

		$.ajax({
			url:'htmls/'+ Keys +'.html',
			success:function(data){
				callbk(data)
			}
		});

		function callbk(data){
			$('.main').html(data);
			var CssLink = document.createElement('link');
			CssLink.rel = "stylesheet";
			CssLink.type = "text/css";
			CssLink.href = "css/" + Keys + ".css";
			document.getElementsByTagName('head')[0].appendChild(CssLink)
		}
	});
	
