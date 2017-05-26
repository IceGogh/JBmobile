
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
				$('.logo').addClass('mubulogo');
				$this.css({color:'#fff'});
				$('.mubuinner li a ').css({color:"rgba(255,255,255,.7)" ,  "transform": "translate(0) scale(1)"});
				$('.mubuinner > div > a').css({opacity:'1'});
				var HideMain = document.createElement('link');
				HideMain.className='HidenM';
				HideMain.rel = "stylesheet";
				HideMain.type = "text/css";
				HideMain.href = "css/mubuHide.css";
				document.getElementsByTagName('head')[0].appendChild(HideMain);
			});
			flag2 = !flag2;

		}else{

			$('.mubu').slideUp();
			$('.list2nd').slideUp();
			$('.list2nd').prev()
				.attr('data-flag','true')
				.css({backgroundImage:' url("img/mainbottom.png")'});
			$this.removeClass('fa-times').addClass('fa-bars');
			$('.mubuinner li a').css({color:"#2f2f2f" , transform:"translate(75px,-15px) scale(1.2)"});
			$('.mubu').promise().done(function(){
				$('.logo').removeClass('mubulogo');
				$this.css({color:'inherit'});
				$('.mubuinner > div > a').css({opacity:0});
			});
			flag2 = !flag2;
			$('.HidenM').remove();
		}
	});

	//  return home page
	$('.returnHome').on('click',function(){
		$('.transfCss').attr('href','css/transf.css');
		$('.toTop').trigger('click');
	});

	// toTop
	$('.toTop').on('click',function(){
		$('html,body').animate({scrollTop:0},400)
	});

	// click <a> main 内容替换
	Transforing($('a[data-keys]'));

	function Transforing(elm){
		elm.on('click',function(){
			var Keys = $(this).attr('data-keys');
			//  先判断 mubu 是否放下状态
			if(!flag2){
				$('.topMenus span').trigger("click");
			}

			$.ajax({
				url:'htmls/'+ Keys +'.html',
				success:function(data){
					callbk(data)
				}
			});

			function callbk(data){
				$('.transfCss').attr('href','css/transfNo.css');
				$('.main0').html(data);
				var CssLink = document.createElement('link');
				CssLink.rel = "stylesheet";
				CssLink.type = "text/css";
				CssLink.href = "css/page.css";
				document.getElementsByTagName('head')[0].appendChild(CssLink);
				$('html,body').animate({scrollTop:0},500);
				$('.list2nd').slideUp();
				$('.list2nd').prev()
					.attr('data-flag','true')
					.css({backgroundImage:' url("img/mainbottom.png")'});

				//  after ajax re-loading , the web refresh
				Transforing($('a[data-keys]'));
			}
		});
	}

	// load img detail
	function loadDetail(elm){
		//	click a data-page choose the detail list
		$('a[data-page]').on('click',function(){
			var pageNub = $(this).attr('data-pageNub');
			var product = $(this).attr('data-page');
			var products = pageNub-0+1;

			$.ajax({
				url:'htmls/products/' + product +'.html',
				success:function(data){
					showList(data);
				}
			});
			function showList(data){
				$('.main0').html(data);
				$('.pageSelect a')
					.removeClass('selProduct')
					.eq(pageNub).addClass('selProduct');

				var productsMain = '';
				var Length = 1;

				$.ajax({
					url : 'htmls/products/json/chugui'+ (products < 9 ? "0"+products : products) +'.json',
					dataType :'json',
					success : function(data){
						showIMG(data)
					}
				});
				function showIMG(Jsondata){
					for( var item in Jsondata){
						Length ++;
					}
					for(var i=1; i<Length; i++){
						productsMain += '<a>'+
							'<img src="' + Jsondata[(i <=9 ? "0"+i : i)][1]+'"/>'+
							'</a>'+
							'<h2>'+ Jsondata[(i <=9 ? "0"+i : i)][0] +'</h2>';
					}

					$('.allWidth').html(productsMain);
					//  after ajax re-loading , the web refresh
					Transforing($('a[data-keys]'));
					loadDetail($('a[data-page]'));

				}
			}

		});
	}







