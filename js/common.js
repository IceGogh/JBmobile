	var Keyword = '';		/* global variable  全局变量  后面异步加载需要*/


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
				$(this).attr('data-flag','false');
				$('.news').css({backgroundImage:' url("img/mainbottom3.png")'});
				$('.join').css({backgroundImage:' url("img/mainbottom3.png")'});
			}
			// 若 点击已展开的 a
			else{
				$(this).css({backgroundImage:' url("img/mainbottom.png")'});
				$(this).next().slideUp();
				$(this).attr('data-flag','true');
				$('.news').css({backgroundImage:' url("img/mainbottom3.png")'});
				$('.join').css({backgroundImage:' url("img/mainbottom3.png")'});

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
					$('.mubuinner li a.dianshang').css({color:'#f23f1c'});
					$('.mubuinner > div > a').css({opacity:'1'});
					var HideMain = document.createElement('link');
					HideMain.className='HidenM';
					HideMain.rel = "stylesheet";
					HideMain.type = "text/css";
					HideMain.href = "css/mubuHide.css";
					document.getElementsByTagName('head')[0].appendChild(HideMain);
					$('.zhuantiCss').remove();
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
				//  main   main0  两个类 隐藏/显示 互换
				$('.HidenM').remove();
			}
		});



	//  return home page
	$('.returnHome').on('click',function(){
		$('.transfCss').attr('href','css/transf.css');
		// 移除专题页样式
		$('.zhuantiCss').remove();
		$('.toTop').trigger('click');
	});



	// toTop
	$('.toTop').on('click',function(){
		$('html,body').animate({scrollTop:0},0)
	});


//  Ajax loading .......
	/*
	* htmls
	* ---loading page...
	* */

	Transforing($('a[data-keys]'));


	// click <a> main Transforing
	function Transforing(elm){

		// 移除专题页样式
		$('.zhuantiCss').remove();

		elm.on('click',function(){
			var Keys = $(this).attr('data-keys');
			KeyWord = Keys.substr(Keys.indexOf('/')+1);
			//  先判断 mubu 是否放下状态
			if(!flag2){
				$('.topMenus span').trigger("click");
			}

			$.ajax({
				url:'htmls/'+ Keys +'.html',
				async:false,		 // makesure all loading complete
				success:function(data){
					callbk(data)
				}
			});

			// 判断 点击跳转的层级  index ?  chugui？  chuguiList?
			if($(this).attr('data-selectFlag')){
				var Nub = $(this).attr('data-selectFlag');
				$('a[data-pagenub="'+ Nub +'"]').trigger("click");
			}


			function callbk(data){
				$('.transfCss').attr('href','css/transfNo.css');
				$('.main0').html(data);

				//  直接写入 head  防止多次 ajax 多次异步加载
/*				var CssLink = document.createElement('link');
				CssLink.rel = "stylesheet";
				CssLink.type = "text/css";
				CssLink.href = "css/page.css";
				document.getElementsByTagName('head')[0].appendChild(CssLink);*/

				//$('html,body').animate({scrollTop:0},500);

				$('.list2nd').slideUp();
				$('.list2nd').prev()
					.attr('data-flag','true')
					.css({backgroundImage:' url("img/mainbottom.png")'});

				// all refresh to top
				$('.toTop').promise().done(function(){
					$(this).trigger('click');
				});

				//  after ajax re-loading , the web refresh
				Transforing($('a[data-keys]'));
			}
		});
	}

	/*
	* htmls-- products --- loding detail
	*/
	// load img detail
	function loadDetail(elm){
		//	click a data-page choose the detail list
		$('a[data-page]').on('click',function(){
			var pageNub = $(this).attr('data-pageNub');		/* 计数 */
			var product = $(this).attr('data-page');		/* productList分类名 */
			var products = pageNub-0+1;						/* 初始改 0 为 1 */

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
					url : 'htmls/products/json/'+ KeyWord + (products < 9 ? "0"+products : products) +'.txt',
					dataType :'json',
					success : function(data){
						showIMG(data);
					}
				});
				function showIMG(Jsondata){
					for( var item in Jsondata){
						Length ++;
					}
					for(var i=1; i<Length; i++){
						productsMain += '<a>'+
							'<img src="' + Jsondata[(i <=9 ? "0"+i : i)][1]+'" data-productsDetail="'+ product + '" data-imgNub="'+ products + '" data-imgNubNo="' + i +'"/>'+
							'</a>'+
							'<h2>'+ Jsondata[(i <=9 ? "0"+i : i)][0] +'</h2>';
					}

					$('.allWidth').html(productsMain);
					//  after ajax re-loading , the web refresh
					Transforing($('a[data-keys]'));
					loadDetail($('a[data-page]'));


					// 跳转详情    chugui -- chuguilist -- productsDetail
					var Nub;
					var NubNo;
					var DetailUrl='';
					loadingproductDetail();
					function loadingproductDetail(){
						$('img[data-productsDetail]').on('click', function(){
							var Detail = $(this).attr('data-productsDetail');
							Nub = $(this).attr('data-imgNub')-1;
							NubNo = $(this).attr('data-imgNubNo')-1;
							$.ajax({
								url :'htmls/products/json/'+ Detail +'.txt',
								dataType:'json',
								success:function(data){
									showingproductDetail(data)
								}
							})
						})
					}

					function showingproductDetail(imgData){
						for(var i=0; i<imgData[Nub][NubNo].length; i++){
							DetailUrl += '<img src="'+ imgData[Nub][NubNo][i] +'"/>'
						}
						$('.allWidth').html(DetailUrl);


						// all refresh to top
						$('.toTop').promise().done(function(){
							$(this).trigger('click');
						})
					}
				}
			}
		});
	}


	//  zhuanti page

	zhuanti();
	function zhuanti(){
		$('a[data-zhuanti]').on('click',function(){
			var keyWord = $(this).attr('data-zhuanti');
			$.ajax({
				url : 'htmls/zhuanti/' + keyWord + '.html',
				success : function(data){
					loadZhanti(data)
				}
			})
		})
	}
	function loadZhanti(data){
		$('.mainZhuanti').html(data);
		var zhuantiCss = document.createElement('link');
		zhuantiCss.className='zhuantiCss';
		zhuantiCss.rel = "stylesheet";
		zhuantiCss.type = "text/css";
		zhuantiCss.href = "css/zhuanti.css";
		document.getElementsByTagName('head')[0].appendChild(zhuantiCss);
		$('html,body').animate({scrollTop:0},0)
	}







